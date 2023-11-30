/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  const message = {
      failedSignIn: 'Login failed!',
      emptyEmail: 'Email field required.',
      invalidCredetials: 'Invalid user credentials.',
  }

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      signInPage.visit();
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with an empty "Email" field', () => {
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertMessage(message.failedSignIn);
    homePage.assertMessage(message.emptyEmail);
  });

  it('should not provide an ability to log in with unregistered email', () => {
    const newEmail = faker.internet.email();
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertMessage(message.failedSignIn);
    homePage.assertMessage(message.invalidCredetials);
  });

  it('should not provide an ability to log in with unregistered password', () => {
    const newPassword = 'hgjkI85*4';
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertMessage(message.failedSignIn);
    homePage.assertMessage(message.invalidCredetials);
  });
});
