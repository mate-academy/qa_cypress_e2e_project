/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    articlePage.visit();

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(article.tag);
    articlePage.publishArticleButton();

    cy.url().should('include', article.title);
    cy.get('h1').should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article);

    articlePage.editArticleButton();
    articlePage.typeTitle(' new');
    articlePage.typeDescription(' new');
    articlePage.typeBody(' new');
    articlePage.publishArticleButton();

    cy.get('h1').should('contain', article.title + ' new');
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article);
    articlePage.deleteArticleButton();

    cy.get('h1').should('contain', 'conduit');
  });
});
