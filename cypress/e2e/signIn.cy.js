/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const faker = require('faker');

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    cy.wait(5000);

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    const incorrectEmail = faker.internet.email();
    signInPage.visit();

    signInPage.emailField.type(incorrectEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertErrorModalSignIn();
  });

  it('should not provide an ability to log in with wrong password', () => {
    const incorrectPassword = faker.internet.password();
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.passwordField.type(incorrectPassword);
    signInPage.clickSignInBtn();

    homePage.assertErrorModalSignIn();
  });
});
