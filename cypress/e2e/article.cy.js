/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from "../support/pages/article.pageObject";
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;
  before(() => {
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    articlePage.visit();
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickOnPublish();

    cy.url().should('include', `articles/${article.title}`);
  });

  it('should be edited using Edit button', () => {
    articlePage.visit();
    cy.createArticle(article.title, article.description, article.body);
    articlePage.clickOnEditBtn();
    articlePage.typeTitle(`{selectAll}${article.newTitle}`);
    articlePage.clickOnPublish();

    cy.url().should('include', `articles/${article.title}`);
  });

  it('should be deleted using Delete button', () => {
    articlePage.visit();
    cy.createArticle(article.title, article.description, article.body, article.tag);  
    articlePage.clickOnDeleteBtn();
      homePage.checkArticlesList();
  });
});
