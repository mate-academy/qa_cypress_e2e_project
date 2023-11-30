/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signInPage.visit();
  });

  it('should provide ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide ability to log in with wrong email', () => {
    const wrongEmail = faker.lorem.word();
    const failedEmailMessage = 'Email must be a valid email.';

    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertModalText(failedEmailMessage);
  });

  it('should not provide ability to log in with wrong password', () => {
    const wrongPassword = faker.lorem.word();
    const failedPasswordMessage = 'Invalid user credentials.';

    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();
    signInPage.assertModalText(failedPasswordMessage);
  });

  it('should not provide ability to log in with empty email field', () => {
    const emptyEmailMessage = 'Email field required.';

    cy.register(user.email, user.username, user.password);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertModalText(emptyEmailMessage);
  });

  it('should not provide ability to log in with empty password field', () => {
    const emptyPasswordMessage = 'Password field required.';

    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.assertModalText(emptyPasswordMessage);
  });
});
