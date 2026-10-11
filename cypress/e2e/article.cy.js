/// <reference types="cypress" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
    });

    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });

    cy.then(() => {
      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      cy.getByDataQa('username-link')
        .should('contain', user.username);
    });
  });

  it('should create an article', () => {
    cy.visit('/#/editor');

    articlePage.createArticle(
      article.title,
      article.description,
      article.body
    );

    cy.contains('h1', article.title).should('be.visible');
    cy.contains(article.body).should('be.visible');
  });

  it('should edit an article', () => {
    cy.visit('/#/editor');

    articlePage.createArticle(
      article.title,
      article.description,
      article.body
    );

    cy.contains('h1', article.title).should('be.visible');

    articlePage.editButton.first().click();

    const updatedTitle = `${article.title}-updated`;

    articlePage.editArticle(
      updatedTitle,
      article.description,
      article.body
    );

    cy.contains('h1', updatedTitle).should('be.visible');
  });

  it('should delete an article', () => {
    cy.visit('/#/editor');

    articlePage.createArticle(
      article.title,
      article.description,
      article.body
    );

    cy.contains('h1', article.title).should('be.visible');

    cy.on('window:alert', () => {});

    articlePage.deleteButton.first().click();

    cy.location('hash').should('not.contain', article.title);
    cy.contains('h1', article.title).should('not.exist');
  });
});
