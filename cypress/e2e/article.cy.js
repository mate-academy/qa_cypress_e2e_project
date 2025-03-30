/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

describe('Article', () => {
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      cy.register(generateUser.email,
        generateUser.username, generateUser.password);

      signInPage.visit();

      signInPage.typeEmail(generateUser.email);
      signInPage.typePassword(generateUser.password);

      signInPage.clickSignInBtn();

      cy.wait(2000);
    });

    articlePage.visit();

    cy.fixture('article').then((obj) => {
      article = obj;

      articlePage.writeTitle(obj.title);
      articlePage.writeAbout(obj.about);
      articlePage.writeBody(obj.body);
      articlePage.writeTags(obj.tags);
    });
  });

  it('should be created using New Article form', () => {
    articlePage.publishArticle();

    cy.wait(2000);

    articlePage.checkPost(article.title, article.body);
  });

  it('should be edited using Edit button', () => {
    articlePage.publishArticle();

    articlePage.clickOnEdit();

    articlePage.writeTitle(article.title + ' 2');
    articlePage.writeAbout(article.about + ' 2');
    articlePage.writeBody(article.body + ' 2');

    cy.wait(1000);

    articlePage.updateArticle();

    cy.wait(2000);

    articlePage.checkPost(article.title, article.body);
  });

  it('should be deleted using Delete button', () => {
    articlePage.publishArticle();

    cy.wait(2000);

    articlePage.clickOnDelete();

    cy.url().should('match', /\/$/);
  });
});
