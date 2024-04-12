/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signUpPage.visit();
    });
  }):

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertSwalText('Your registration was successful!');
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register without username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Username field required.');
  });

  it('should not provide an ability to register without email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Email field required.');
  });

  it('should not provide an ability to register without password', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typeUsername(user.username);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Password field required.');
  });

  it('should not provide an ability to register with email not contains "@" symbol', () => {
    const wrongEmail = 'testsymbol.com';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typePassword(user.password);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Email must be a valid email.');
  });

  it('should not provide an ability to register with email not contains top-domain', () => {
    const wrongEmail = 'test@symbolcom';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typePassword(user.password);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Email must be a valid email.');
  });

  it('should not provide an ability to register with email not contains domain', () => {
    const wrongEmail = 'test@.com';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typePassword(user.password);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Email must be a valid email.');
  });

  it('should not provide an ability to register with password not contains at least one numeric symbol', () => {
    const wrongPassword = 'testTest!';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(wrongPassword);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not provide an ability to register with password not contains at least one uppercase letter', () => {
    const wrongPassword = 'testtes1t!';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(wrongPassword);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not provide an ability to register with password not contains at least one lowercase letter', () => {
    const wrongPassword = 'TESTTEST23!';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(wrongPassword);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

  it('should not provide an ability to register with password contains less than 8 characters', () => {
    const wrongPassword = 'TetT23!';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(wrongPassword);
    cy.intercept('/users').as('registerUser');
    signUpPage.clickSignUpBtn();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    signUpPage.assertSwalText('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });
});
