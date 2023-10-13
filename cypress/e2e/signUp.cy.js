/// <reference types='cypress' />
/// <reference types='../support' />

import signUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from '../support/pages/home.pageObject';

const faker = require('faker');
const signUpPage = new signUpPageObject();
const homePage = new HomePageObject();

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  emailWithoutName: '@mail.com',
  emailWithoutAt: 'namemail.com',
  emailWithoutDomain: 'name@.com',
  emailWithoutDot: 'name@mailcom',
  emailWithoutTopDomain: 'name@mail.',
  checkUsername: 'someUser'
};

describe('Sign Up page', () => {
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should provide the ability to sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide the ability to sign up with taken username', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('some_new_email@mail.com');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('This username is taken');
  });

  it('should not provide the ability to sign up with taken email', () => {
    signUpPage.typeUsername(user.checkUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('Email already taken.');
  });

  it('should not provide the ability to sign up with empty username', () => {
    signUpPage.typeEmail('newEmail@mail.com');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('Username field required.');
  });

  it('should not provide the ability to sign up with empty email', () => {
    signUpPage.typeUsername(user.checkUsername);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('Email field required.');
  });

  it('should not provide the ability to sign up with empty password', () => {
    signUpPage.typeUsername(user.checkUsername);
    signUpPage.typeEmail('newEmail@mail.com');
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('Password field required.');
  });

  it('should not provide the ability to sign up with email without name', () => {
    signUpPage.typeUsername(user.checkUsername);
    signUpPage.typeEmail(user.emailWithoutName);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('Email must be a valid email.');
  });

  it('should not provide the ability to sign up with email without "@"', () => {
    signUpPage.typeUsername(user.checkUsername);
    signUpPage.typeEmail(user.emailWithoutAt);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('Email must be a valid email.');
  });

  it('should not provide the ability to sign up with email without domain name', () => {
    signUpPage.typeUsername(user.checkUsername);
    signUpPage.typeEmail(user.emailWithoutDomain);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('Email must be a valid email.');
  });

  it('should not provide the ability to sign up with email without "."', () => {
    signUpPage.typeUsername(user.checkUsername);
    signUpPage.typeEmail(user.emailWithoutDot);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('Email must be a valid email.');
  });

  it('should not provide the ability to sign up with email without top-domain name', () => {
    signUpPage.typeUsername(user.checkUsername);
    signUpPage.typeEmail(user.emailWithoutTopDomain);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').contains('Email must be a valid email.');
  });

  it('should provide the ability to redirect to the Sign In page', () => {
    signUpPage.visit();

    signUpPage.goToSignIn();

    cy.url().should('contain', '/#/login');
  });
});
