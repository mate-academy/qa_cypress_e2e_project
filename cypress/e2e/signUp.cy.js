/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

const invalidUserData = {
  email: 'testUser#$qa.team',
  password: 'qwerty'
};

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    signUpPage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not sign up with email containing special characters', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(invalidUserData.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-title').should('have.text', 'Registration failed!');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.get('.swal-text').invoke('text').then((text) => {
      expect(text.trim()).to.equal('Email must be a valid email.');
    });
    cy.get('.swal-button').click();
  });

  it('should not sign up with an invalid password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(invalidUserData.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-title').should('have.text', 'Registration failed!');
    cy.get('.swal-text').invoke('text').then((text) => {
      // eslint-disable-next-line max-len
      expect(text.trim()).to.equal('Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    });
    cy.get('.swal-button').click();
  });

  it('should not sign up with empty username', () => {
    signUpPage.typeUsername('');
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.contains('.swal-title', 'Registration failed!').should('be.visible');
    cy.contains('.swal-text', 'Username field required.').should('be.visible');
    cy.get('.swal-button').click();
  });

  it('should not sign up with an empty email field', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-title').should('have.text', 'Registration failed!');
    cy.get('.swal-text').invoke('text').then((text) => {
      expect(text.trim()).to.equal('Email field required.');
    });
    cy.get('.swal-button').click();
  });

  it('should not sign up with an empty password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('');

    signUpPage.clickSignUpBtn();

    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-title').should('have.text', 'Registration failed!');
    cy.get('.swal-text').invoke('text').then((text) => {
      expect(text.trim()).to.equal('Password field required.');
    });
    cy.get('.swal-button').click();
  });
});
