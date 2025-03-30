/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import alertsMessages from "../support/pages/allertMessages.pageObject";

const signUpPage = new SignUpPageObject();



describe('Sign Up page', () => {
let user;

beforeEach(() => {
cy.task('db:clear');
cy.task('generateUser').then((generatedUser) => {
user = generatedUser;
});
signUpPage.visit();

});

it('should sign up with valid credentials', () => {
  const passwordSignUp = 'Qwert123@';
  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().successfulMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '#/');
});

it('should not sign up with empty email field', () => {
  const passwordSignUp = 'Qwert123@';
  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  //signUpPage.setEmailFieldAttr();
  //signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().emptyEmailMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up with empty username field', () => {
  const passwordSignUp = 'Qwert123@';
  //signUpPage.setUsernameFieldAttr();
  //signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.assertModalContent(alertsMessages().emptyUsernameMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up with empty password field', () => {
  const passwordSignUp = 'Qwert123@';
  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  //signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.assertModalContent(alertsMessages().emptyPasswordMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up with 7characters password field', () => {
  const passwordSignUp = 'Qwertyu';
  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.assertModalContent(alertsMessages().longPasswordValidationMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up with spaces in password field', () => {
  const passwordSignUp = '        ';
  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.assertModalContent(alertsMessages().longPasswordValidationMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up with invalid [name] in email field', () => {
  const passwordSignUp = 'Qwerty1@';
  const emailSingUp = '#$%@#45fv@gmail.com'
  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  //signUpPage.setEmailFieldAttr();
  //signUpPage.typeEmail(user.email);
  signUpPage.typeEmail(emailSingUp);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up with invalid [domain] in email field', () => {
  const passwordSignUp = 'Qwerty1@';
  const emailSingUp = 'Qwerty123qwert@34#@$esg.com'
  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  //signUpPage.setEmailFieldAttr();
  //signUpPage.typeEmail(user.email);
  signUpPage.typeEmail(emailSingUp);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up with invalid [sub domain] in email field', () => {
  const passwordSignUp = 'Qwerty1@';
  const emailSingUp = 'Qwerty123qwert@gmail.#@$@#@#dfb'
  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  //signUpPage.setEmailFieldAttr();
  //signUpPage.typeEmail(user.email);
  signUpPage.typeEmail(emailSingUp);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

//Bug.
it('should not sign up only with spaces in the  username', () => {
  const passwordSignUp = 'Qwerty1@';
  const usernameSignUp = '        ';

  //signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(usernameSignUp);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});


it('should not sign up only with spaces in the  password field', () => {
  const passwordSignUp = '      ';

  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up only without  at least 1 uppercase  password field', () => {
  const passwordSignUp = 'qwerty123@';

  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

    cy.wait(500)
    
  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.assertModalContent(alertsMessages().longPasswordValidationMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

//Bug
it('should not sign up only without  at least 1 symbol  password field', () => {
  const passwordSignUp = 'Qwerty123';

  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

    cy.wait(500)

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.assertModalContent(alertsMessages().longPasswordValidationMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up only without  at least 1 number password field', () => {
  const passwordSignUp = 'Qwertyqwe@';

  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

    cy.wait(500)

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.assertModalContent(alertsMessages().longPasswordValidationMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});

it('should not sign up only without  at least 1 lowercase character password field', () => {
  const passwordSignUp = 'QQWERT123@';

  signUpPage.setUsernameFieldAttr();
  signUpPage.typeUsername(user.username);
  signUpPage.setEmailFieldAttr();
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(passwordSignUp);
  signUpPage.signUpBtn();

    cy.wait(500)

  signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
  signUpPage.assertModalContent(alertsMessages().longPasswordValidationMessage);
  signUpPage.clickModalOkBTN();
  cy.url().should('include', '/register');
});
})
