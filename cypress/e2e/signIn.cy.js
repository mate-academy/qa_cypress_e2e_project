/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import alertsMessages from "../support/pages/allertMessages.pageObject";

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();


describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    signInPage.visit();
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it.only('should provide an ability to log in with existing credentials', () => {

    cy.register(user.email, user.username, user.password);
    cy.logIn(user.email, user.password);

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong password', () => {
    const incorrectPassword = 'wrongPassword';
  
    cy.logIn(user.email, user.password);
    
    signInPage.assertModalContent(alertsMessages().loginFailedMessage); 
    signInPage.assertModalContent(alertsMessages().invalidCredentialsMessage);
  
    signInPage.clickModalOkBTN();
    cy.url().should('include', '/login');
  });

  it('should not provide an ability to log in with wrong email', () => {
    const incorrectEmail = 'wrong@example.com';
  
    signInPage.typeEmail(incorrectEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertModalContent(alertsMessages().loginFailedMessage);
    signInPage.assertModalContent(alertsMessages().invalidCredentialsMessage);
  
    signInPage.clickModalOkBTN();

    cy.url().should('include', '/login');
  });

  it('should not provide an ability to log in with empty email field', () => {
    const incorrectEmail = 'wrong@example.com';
    const incorrectPassword = 'wrongPassword';
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  
    signInPage.assertModalContent(alertsMessages().loginFailedMessage);
    signInPage.assertModalContent(alertsMessages().emptyEmailMessage);

  
    signInPage.clickModalOkBTN();

    cy.url().should('include', '/login');
  });

  it('should not provide an ability to log in with empty password field', () => {
    const incorrectEmail = 'wrong@example.com';
    const incorrectPassword = 'wrongPassword';

    signInPage.emailField.type(user.email);
    signInPage.clickSignInBtn();   
    signInPage.assertModalContent(alertsMessages().loginFailedMessage);
    signInPage.assertModalContent(alertsMessages().invalidCredentialsMessage);
    signInPage.clickModalOkBTN();

    cy.url().should('include', '/login');
  });


  it('should not provide an ability to log in with short password field', () => {
    const incorrectPassword = '1234567';

    signInPage.emailField.type(user.email);
    signInPage.typePassword(incorrectPassword);
    signInPage.clickSignInBtn();
    signInPage.assertModalContent(alertsMessages().loginFailedMessage);
    signInPage.assertModalContent(alertsMessages().invalidCredentialsMessage);
    signInPage.clickModalOkBTN();

    cy.url().should('include', '/login');
  });
});
