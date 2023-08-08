/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';
import { generatePassword, generateUsername } from '../support/helpfunctions';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.successMessage();
    homePage.assertHeaderContainUsername(user.username);
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with an username that is not unique', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);
    const newEmail = faker.internet.email();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(newEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with 2 symbols for username', () => {
    signUpPage.visit();

    signUpPage.typeUsername('te');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should provide an ability to sign up with 3 symbols for username', () => {
    signUpPage.visit();
    signUpPage.typeUsername('tes');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.successMessage();
    homePage.assertHeaderContainUsername('tes');
  });

  // eslint-disable-next-line max-len
  it('should provide an ability to sign up with 40 symbols for username', () => {
    signUpPage.visit();
    const username = generateUsername(40);
    signUpPage.typeUsername(username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.successMessage();
    homePage.assertHeaderContainUsername(username);
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with 41 symbols for username', () => {
    signUpPage.visit();
    const username = generateUsername(41);
    signUpPage.typeUsername(username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with an e-mail that is not unique', () => {
    signUpPage.visit();
    cy.register(user.email, user.username, user.password);

    const newUsername = faker.name.firstName();

    signUpPage.typeUsername(newUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email already taken.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with an empty e-mail', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email field required.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with email without name', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('@qa.team');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with email without top-domain', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('testuser456@qa.');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with email without domain', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('testuser456@.team');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with email without "at sign" ("@") symbol', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('testuser456qa.team');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with email without dot', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('testuser456@qateam');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with empty password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Password field required.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with 7 symbols for password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('Testu1@');
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should provide an ability to sign up with 8 symbols for password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('Testus1@');
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  // eslint-disable-next-line max-len
  it('should provide an ability to sign up with 9 symbols for password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('Testuse1@');
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  // eslint-disable-next-line max-len
  it('should provide an ability to sign up with 29 symbols for password', () => {
    signUpPage.visit();
    const password = generatePassword(26);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  // eslint-disable-next-line max-len
  it('should provide an ability to sign up with 30 symbols for password', () => {
    signUpPage.visit();
    const password = generatePassword(27);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with 31 symbols for password', () => {
    signUpPage.visit();
    const password = generatePassword(28);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up without digits in password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('Testqwe@');
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up without uppercase letter in password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('12345qwert');
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    cy.url().should('include', 'register');
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up without lowercase letter in password', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('12345QWERT');
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    cy.url().should('include', 'register');
  });
});
