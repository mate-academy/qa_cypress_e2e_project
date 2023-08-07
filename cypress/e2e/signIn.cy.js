/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  const invalidUserPassword = 'Invld';
  const invalidUserEmail = 'Invldemail';

  beforeEach(() => {
    cy.task('db:clear'); //
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

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with an invalid password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(invalidUserPassword);
    signInPage.clickSignInBtn();

    cy.wait(3000);

    signInPage.assertInvalidUserCredentials();
  });

  it('should not provide an ability to log in with an invalid email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(invalidUserEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.wait(3000);

    signInPage.assertEmailMustBeAValidEmail();
  });

  it('should not provide an ability to log in with an empty email field', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.wait(3000);

    signInPage.assertEmailFieldRequired();
  });

  it('should not provide an ability to log in with an empty password field', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();

    cy.wait(3000);

    signInPage.assertPasswordFieldRequired();
  });
});
