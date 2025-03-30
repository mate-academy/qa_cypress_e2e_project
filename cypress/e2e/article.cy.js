/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import { generateFakeUser, generateFakeArticle } from '../support/fakeUser';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

describe('Article functionality', () => {
  let user;
  let newArticle;
  let updatedArticle;

  before(() => {
    cy.task('db:clear');

    user = generateFakeUser();
    newArticle = generateFakeArticle();
    updatedArticle = generateFakeArticle();

    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.contains('Your registration was successful').should('be.visible');
    cy.contains('OK').click({ force: true });
  });

  it('should allow the user to create a new article, edit it, and delete it', () => {
    articlePage.newArticleLink.click();
    articlePage.typeTitle(newArticle.title);
    articlePage.typeDescription(newArticle.description);
    articlePage.typeBody(newArticle.body);
    articlePage.clickSubmitBtn();

    cy.contains(newArticle.title).should('be.visible');
    cy.wait(1000);

    articlePage.clickEditBtn();
    articlePage.bodyField.clear().type(updatedArticle.body);
    articlePage.clickSubmitBtn();

    cy.contains(updatedArticle.body).should('be.visible');

    articlePage.clickDeleteBtn();

    cy.url().should('eq', 'http://localhost:1667/#/');
  });
});
