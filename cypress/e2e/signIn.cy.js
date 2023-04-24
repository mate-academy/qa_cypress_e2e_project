/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ModalWindow from '../support/pages/modalWindow.pageObject';
import Header from '../support/pages/header.pageObject';

const signInPage = new SignInPageObject();
const modal = new ModalWindow();
const header = new Header();

describe('Sign In page', () => {
  let email, username, password;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      email = user.email;
      username = user.username;
      password = user.password;
      cy.register(email, username, password);
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();

    signInPage.emailField.type(email);
    signInPage.passwordField.type(password);
    signInPage.signInBtn.click();

    header.usernameLink.should('contain', username);
  });

  context(
    'should not provide an ability to log in with wrong credentials:',
    () => {
      it('wrong email', () => {
        signInPage.visit();
        signInPage.emailField.type('emailNotExist@mail.com');
        signInPage.passwordField.type(password);
        signInPage.signInBtn.click();
        cy.fixture('modalWindow').then((window) => {
          modal.title.should('contain', window.loginFailed);
          modal.infoText.should('contain', window.invalidCreds);
        });
        header.usernameLink.should('not.exist');
      });
      it('wrong password', () => {
        signInPage.visit();
        signInPage.emailField.type(email);
        signInPage.passwordField.type('1q2w3e4R');
        signInPage.signInBtn.click();
        cy.fixture('modalWindow').then((window) => {
          modal.title.should('contain', window.loginFailed);
          modal.infoText.should('contain', window.invalidCreds);
        });
        header.usernameLink.should('not.exist');
      });

      it('wrong email and password', () => {
        signInPage.visit();
        signInPage.emailField.type('emailNotExist@mail.com');
        signInPage.passwordField.type('1q2w3e4R');
        signInPage.signInBtn.click();
        cy.fixture('modalWindow').then((window) => {
          modal.title.should('contain', window.loginFailed);
          modal.infoText.should('contain', window.invalidCreds);
        });
        header.usernameLink.should('not.exist');
      });

      it('emty email and password fields', () => {
        signInPage.visit();
        signInPage.signInBtn.click();
        cy.fixture('modalWindow').then((window) => {
          modal.title.should('contain', window.loginFailed);
          modal.infoText.should('contain', window.emailRequired);
        });
        header.usernameLink.should('not.exist');
      });
    }
  );
});
