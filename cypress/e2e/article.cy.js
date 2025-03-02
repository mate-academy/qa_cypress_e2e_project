/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from "../support/pages/signIn.pageObject";
const signInPage = new SignInPageObject();
import ArticlePageObject from "../support/pages/article.pageObject";
const articlePage = new ArticlePageObject();
describe('Article', () => {
 beforeEach(() => {
   let user;
   cy.task('db:clear');
   cy.task('generateUser').then((generateUser) => {
      user = new Object(generateUser);
      cy.login(user.email, user.username, user.password);
   });
   articlePage.visit();
 });

  it('should be created using New Article form', () => {
    cy.task('generateArticle').then((articleDataString) => {
      const article = new Object(articleDataString);
      articlePage.typeArticleTitle(article.title);
      articlePage.typeArticleDesc(article.description);
      articlePage.typeArticleBody(article.body);
      articlePage.publishArticle();
    });
  });

  it('should be edited using Edit button', () => {
    cy.task('generateArticle').then((articleDataString) => {
      const article = new Object(articleDataString);
      cy.createArticle(article.title, article.description, article.body);
    });
    articlePage.editArticle();
    cy.task('generateArticle').then((articleDataString) => {
      const articleUpdated = new Object(articleDataString);
      articlePage.typeArticleTitle(articleUpdated.title);
      articlePage.typeArticleDesc(articleUpdated.description);
      articlePage.typeArticleBody(articleUpdated.body);
    });

    articlePage.updateArticle();
  });

  it('should be deleted using Delete button', () => {
    cy.task('generateArticle').then((articleDataString) => {
      const article = new Object(articleDataString);
      cy.createArticle(article.title, article.description, article.body);
    });
    articlePage.deleteArticle();
  });
});
