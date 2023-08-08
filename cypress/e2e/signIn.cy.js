/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  // eslint-disable-next-line max-len
  it.only('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to log in with unregistered email', () => {
    const unregisteredEmail = faker.internet.email();

    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(unregisteredEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Invalid user credentials.');
    cy.url().should('include', 'login');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to log in when the password doesn\'t match with email', () => {
    const unregisteredPassword = faker.internet.password();

    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(unregisteredPassword);
    signInPage.clickSignInBtn();

    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Invalid user credentials.');
    cy.url().should('include', 'login');
  });

  it('should not provide an ability to log in with empty email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn('');

    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Email field required.');
    cy.url().should('include', 'login');
  });

  it('should not provide an ability to log in with empty password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn('');

    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Password field required.');
    cy.url().should('include', 'login');
  });
});
