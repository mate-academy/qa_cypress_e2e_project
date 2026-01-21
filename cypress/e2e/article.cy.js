/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/articlePage.pageObject';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let username;
  let email;
  let password;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      username = user.username;
      email = user.email;
      password = user.password;

      cy.register(email, username, password);
      signInPage.visit();
      signInPage.typeEmail(email);
      signInPage.typePassword(password);
      signInPage.clickSignInBtn();

      cy.url().should('include', '/#/');
    });
  });

  it('should be created using New Article form', () => {
    cy.task('generateArticle').then((article) => {
      articlePage.clickNewArticleBtn();
      cy.url().should('include', 'editor');

      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag('Other');
      articlePage.clickPublishArticleBtn();

      cy.get('[data-qa="article-title"]').should('contain', article.title);
    });
  });

  it('should be edited using Edit button', () => {
    cy.task('generateArticle').then((article) => {
      articlePage.clickNewArticleBtn();
      cy.url().should('include', 'editor');

      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag('Other');
      articlePage.clickPublishArticleBtn();

      cy.get('[data-qa="article-title"]').should('be.visible');
      cy.task('generateArticle').then((newArticle) => {
        const changedTitle = newArticle.title + '_edited';
        articlePage.editArticleBtn.click();
        cy.url().should('include', 'editor');
        articlePage.titleField.clear().type(changedTitle);
        articlePage.clickPublishArticleBtn();

        cy.get('[data-qa="article-title"]').should('contain', changedTitle);
      });
    });
  });

  it('should be deleted using Delete button', () => {
    cy.task('generateArticle').then((article) => {
      articlePage.clickNewArticleBtn();
      cy.url().should('include', 'editor');

      articlePage.typeTitle(article.title);
      articlePage.typeAbout(article.description);
      articlePage.typeText(article.body);
      articlePage.typeTag('Other');
      articlePage.clickPublishArticleBtn();

      cy.get('[data-qa="article-title"]').should('be.visible');
      articlePage.deleteArticleBtn.click();
      cy.get('[data-qa="no-articles-message"]').should('be.visible');
    });
  });
});
