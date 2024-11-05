/// <reference types='cypress' />
/// <reference types='../support' />

import NewArticlePageObject from "../support/pages/newArticle.pageObject";
import ArticlePageObject from "../support/pages/article.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const newArticlePage = new NewArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {

  });
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.password, user.username);
    })
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    })
  });

  it('should be created using New Article form', () => {
    newArticlePage.visit();
    homePage.clickOnNewArticleLink();
    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);

    newArticlePage.clickOnPublishBtn();

    newArticlePage.checkNewArticleLink(article.title);
  });

  it.only('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body);
    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);

    newArticlePage.clickOnPublishBtn();

    newArticlePage.checkNewArticleLink(article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body);
    articlePage.clickOnDeleteArticleBtn();
    homePage.verifyUrl();

  });
});
