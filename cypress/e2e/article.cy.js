/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.page-object';
import ArticlePageObject from '../support/pages/article.page-object';

const signUpPage = new SignUpPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-button').click();

    articlePage.visit();
    articlePage.articleTitle.type(article.title);
    articlePage.articleDescription.type(article.description);
    articlePage.articleBody.type(article.body);
    articlePage.submitButton.click();

    cy.url().should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-button').click();

    articlePage.visit();
    articlePage.articleTitle.type(article.title);
    articlePage.articleDescription.type(article.description);
    articlePage.articleBody.type(article.body);
    articlePage.submitButton.click();

    articlePage.editButton.first().click();
    articlePage.articleTitle.clear();
    articlePage.articleTitle.type('new Article');
    articlePage.submitButton.click();
    articlePage.articleContainer.should('contain', 'new Article');
  });

  it('should be deleted using Delete button', () => {
    signUpPage.visit();
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-button').click();

    articlePage.visit();
    articlePage.articleTitle.type(article.title);
    articlePage.articleDescription.type(article.description);
    articlePage.articleBody.type(article.body);
    articlePage.submitButton.click();

    articlePage.deleteButton.first().click();
    cy.url().should('not.include', article.title);
  });
});
