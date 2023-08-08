/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();


describe('Sign Up page', () => {
  let user;
  const randomNumber = Math.floor(Math.random() * 100000);

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should sign up user with valid credentials', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('.swal-modal').contains('Your registration was successful!');
    cy.url().should('be.equal', 'http://localhost:1667/#/');
    homePage.assertHeaderContainUsername(user.username);
  });

  it('shouldn\'t sign up user with empty username field', () => {
    signUpPage.visit();
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with whitespace characters in username field', () => {
    signUpPage.visit();
    signUpPage.typeUsername(' ');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with whitespace characters in email field', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(' ');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with whitespace characters in password field', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(' ');
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with empty email field', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with empty password field', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with username containing olny numbers', () => {
    signUpPage.visit();
    signUpPage.typeUsername('1111111');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with email address without email username', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('@mail.com');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with email address without email domain', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('test' + `${randomNumber}`);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with email address without email top domain', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('test' + `${randomNumber}` + '@mail');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with 7 character password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('test' + `${randomNumber}` + '@mail.com');
    signUpPage.typePassword('123Gg67');
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with password without numbers', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('test' + `${randomNumber}` + '@mail.com');
    signUpPage.typePassword('ggggGGGG');
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with password without upper letters', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('test' + `${randomNumber}` + '@mail.com');
    signUpPage.typePassword('gggg1234');
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

  it('shouldn\'t sign up user with password without lower letters', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('test' + `${randomNumber}` + '@mail.com');
    signUpPage.typePassword('GGGG1234');
    signUpPage.clickSignUpBtn();
    cy.get('[role="dialog"]').should('contain', 'Registration failed!');
    cy.get('.swal-button').click();
    cy.url().should('contain', '#/register');
  });

}); 