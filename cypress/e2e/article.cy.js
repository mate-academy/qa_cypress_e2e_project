/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePage from "../support/pages/article.pageObjects";

const articlePage = new ArticlePage();

describe('Article', () => {
  let user;
  let article;
  let newArticle;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
      cy.loginAsUser(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
    cy.task('generateArticle').then(generateArticle => {
      newArticle = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    articlePage.visit();

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickArticleBtn();
    articlePage.assertArticleTitleCheck(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticleAsUser(article.title, article.description, article.body);

    articlePage.visit();
    articlePage.clickEditBtn();
    articlePage.clearTitle();
    articlePage.clearDescription();
    articlePage.clearBody();
    articlePage.typeTitle(newArticle.title);
    articlePage.typeDescription(newArticle.description);
    articlePage.typeBody(newArticle.body);
    articlePage.clickArticleBtn();
    articlePage.assertArticleTitleCheck(newArticle.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticleAsUser(article.title, article.description, article.body);

    articlePage.visit();

    articlePage.clickDeleatBtn();
    articlePage.clickFeedBtn();
    articlePage.assertDeleatCheck();
  });
});
