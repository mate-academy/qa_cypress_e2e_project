/// <reference types='cypress' />
/// <reference types='../support' />

import alertsMessages from '../support/pages/alertmessage.pageObject.js';
import SignUpPageObject from '../support/pages/signup.pageObject.js';

// import HomePageObject from 'faker/lib/locales/he/index.js';
const signUpPage = new SignUpPageObject();
// const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should sign up with valid details', () => {
    signUpPage.visit();
    signUpPage.fillUsername(user.username);
    signUpPage.fillEmail(user.email);
    signUpPage.fillPassword(user.password);
    signUpPage.submit();
    signUpPage.assertModalContent(alertsMessages().successfulMessage);
  });

  it('should show an error with empty username', () => {
    signUpPage.visit();
    //signUpPage.fillUsername(user.username);
    signUpPage.fillEmail(user.email);
    signUpPage.fillPassword(user.password);
    signUpPage.submit();
    signUpPage.assertModalContent(alertsMessages().emptyUsernameMessage);
  });

  it('should show an error with empty email', () => {
    signUpPage.visit();
    signUpPage.fillUsername(user.username);
    //signUpPage.fillEmail(user.email);
    signUpPage.fillPassword(user.password);
    signUpPage.submit();
    signUpPage.assertModalContent(alertsMessages().emptyEmailMessage);
  });

  it('should show an error with empty password', () => {
    signUpPage.visit();
    signUpPage.fillUsername(user.username);
    signUpPage.fillEmail(user.email);
    //signUpPage.fillPassword(user.password);
    signUpPage.submit();
    signUpPage.assertModalContent(alertsMessages().emptyPasswordMessage);
  });
});
