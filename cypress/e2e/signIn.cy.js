/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  const alertMessage = {
    failedLogin: 'Login failed!',
    emptyEmail: 'Email field required.',
    emptyPassword: 'Password field required.',
    invalidCredentials: 'Invalid user credentials.'
  };

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
    cy.url().should('include', '/#/');
    cy.url().should('not.include', '/login');
  });

  it('should not allow to log in without email', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertWindowForFailedLogin(alertMessage.failedLogin);
    signInPage.assertWindowForFailedLogin(alertMessage.emptyEmail);

    cy.url().should('include', '/login');
  });

  it('should not allow to log in without password', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();

    signInPage.assertWindowForFailedLogin(alertMessage.failedLogin);
    signInPage.assertWindowForFailedLogin(alertMessage.emptyPassword);

    cy.url().should('include', '/login');
  });

  it('should not allow to log in with unregistered  email', () => {
    cy.register(user.email, user.username, user.password);

    const uregisteredEmail = faker.internet.email();

    signInPage.typeEmail(uregisteredEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertWindowForFailedLogin(alertMessage.failedLogin);
    signInPage.assertWindowForFailedLogin(alertMessage.invalidCredentials);

    cy.url().should('include', '/login');
  });

  it('should not allow to log in with wrong password', () => {
    cy.register(user.email, user.username, user.password);

    const wrongPassword = faker.lorem.word() + 'qA0';

    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();

    signInPage.assertWindowForFailedLogin(alertMessage.failedLogin);
    signInPage.assertWindowForFailedLogin(alertMessage.invalidCredentials);

    cy.url().should('include', '/login');
  });
});
