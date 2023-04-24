/// <reference types="cypress" />
/// <reference types="../support" />

import { faker } from '@faker-js/faker';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import Header from '../support/pages/header.pageObject';
import ModalWindow from '../support/pages/modalWindow.pageObject';

const signUpPage = new SignUpPageObject();
const modal = new ModalWindow();
const header = new Header();

describe('Sign Up page', () => {
  let email, username, password;
  const randomEmail = faker.internet.email();
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      email = user.email;
      username = user.username;
      password = user.password;
    });
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('Should sign up with valid creds', () => {
    signUpPage.usernameField.type(username);
    signUpPage.emailField.type(email);
    signUpPage.passwordField.type(password);
    signUpPage.signUpBtn.click();
    cy.fixture('modalWindow').then((window) => {
      modal.title.should('contain.text', window.successTitle);
      modal.infoText.should('contain.text', window.successText);
      modal.submitFormBtn.click();
      modal.title.should('not.be.visible');
      modal.infoText.should('not.be.visible');
    });
    header.usernameLink.should('contain', username);
  });

  context('SHOULD NOT SIGN UP IF:', () => {
    it('email is taken', () => {
      signUpPage.usernameField.type(username);
      signUpPage.emailField.type(email);
      signUpPage.passwordField.type(password);
      signUpPage.signUpBtn.click();
      cy.fixture('modalWindow').then((window) => {
        modal.title.should('contain.text', window.failureTitle);
        modal.infoText.should('contain.text', window.emailTaken);
      });
    });

    it('all fields are empty', () => {
      cy.fixture('modalWindow').then((window) => {
        signUpPage.signUpBtn.click();
        modal.title.should('contain.text', window.failureTitle);
        modal.infoText.should('contain.text', window.usernameRequired);
      });
    });

    it('"Email" and "Password" fields are empty', () => {
      cy.fixture('modalWindow').then((window) => {
        signUpPage.usernameField.type(username);
        signUpPage.signUpBtn.click();
        modal.title.should('contain.text', window.failureTitle);
        modal.infoText.should('contain.text', window.emailRequired);
      });
    });

    it('"Password" field is empty', () => {
      cy.fixture('modalWindow').then((window) => {
        signUpPage.usernameField.type(username);
        signUpPage.emailField.type(randomEmail);
        signUpPage.signUpBtn.click();
        modal.title.should('contain.text', window.failureTitle);
        modal.infoText.should('contain.text', window.passwordRequired);
      });
    });

    it('password is 7 chars long', () => {
      cy.fixture('modalWindow').then((window) => {
        signUpPage.usernameField.type(username);
        signUpPage.emailField.type(randomEmail);
        cy.fixture('invalidPassword').then((password) => {
          signUpPage.passwordField.type(password.sevenCharsLong);
        });
        signUpPage.signUpBtn.click();
        modal.title.should('contain.text', window.failureTitle);
        modal.infoText.should('contain.text', window.incorrectPassword);
      });
    });
    it('number is ommited in password', () => {
      cy.fixture('modalWindow').then((window) => {
        signUpPage.usernameField.type(username);
        signUpPage.emailField.type(randomEmail);
        cy.fixture('invalidPassword').then((password) => {
          signUpPage.passwordField.type(password.numberOmitted);
        });
        signUpPage.signUpBtn.click();
        modal.title.should('contain.text', window.failureTitle);
        modal.infoText.should('contain.text', window.incorrectPassword);
      });
    });

    it('uppercase letter is ommited in password', () => {
      cy.fixture('modalWindow').then((window) => {
        signUpPage.usernameField.type(username);
        signUpPage.emailField.type(randomEmail);
        cy.fixture('invalidPassword').then((password) => {
          signUpPage.passwordField.type(password.uppercaseLetterOmitted);
        });
        signUpPage.signUpBtn.click();
        modal.title.should('contain.text', window.failureTitle);
        modal.infoText.should('contain.text', window.incorrectPassword);
      });
    });

    it('lowercase letter is ommited in password', () => {
      cy.fixture('modalWindow').then((window) => {
        signUpPage.usernameField.type(username);
        signUpPage.emailField.type(randomEmail);
        cy.fixture('invalidPassword').then((password) => {
          signUpPage.passwordField.type(password.lowercaseLetterOmitted);
        });
        signUpPage.signUpBtn.click();
        modal.title.should('contain.text', window.failureTitle);
        modal.infoText.should('contain.text', window.incorrectPassword);
      });
    });
  });
});
