/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
const faker = require('faker');

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with blank required fields', () => {
    signInPage.clickSignInBtn();

    signInPage.assertEmailBlankError();
  });

  it('should not provide an ability to log in with blank email', () => {
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertEmailBlankError();
  });

  it('should not provide an ability to log in with blank password', () => {
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();

    signInPage.assertPasswordBlankError();
  });

  it('should cover the password field with asterisks', () => {
    signInPage.typePassword(user.password);

    signInPage.checkPasswordAsterisks();
  });

  it('should not provide an ability to log in with not registered password', () => {
    const newPassword = 'zxcV1234!';

    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    signInPage.assertInvalidCredentials();
  });

  it('should not provide an ability to log in with not registered email', () => {
    const newEmail = faker.internet.email();

    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertInvalidCredentials();
  });

  it('should not provide an ability to log in with email without at', () => {
    const newEmail = faker.name.firstName() + 'yahoo.com';

    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertInvalidEmail();
  });

  it('should not provide an ability to log in with email without top-domain', () => {
    const newEmail = faker.name.lastName() + 'mail';

    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertInvalidEmail();
  });
});
