/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import alertsMessages from '../support/pages/alertmessage.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with invalid email', () => {
    signInPage.visit();
    cy.get('[data-cy="email-sign-in"]').type('sadfewefa.gmail.com');
    cy.get('[data-cy="password-sign-in"]').type('Qwert123!@');
    cy.get('[data-cy="sign-in-btn"]').click();
    signInPage.assertModalContent(alertsMessages().invalidEmailMessage);
  });

  it('should not provide an ability to log in with invalid password',
    () => {
      signInPage.visit();
      cy.get('[data-cy="email-sign-in"]').type('sadfewefa@gmail.com');
      cy.get('[data-cy="password-sign-in"]').type('123!@');
      cy.get('[data-cy="sign-in-btn"]').click();
      signInPage.assertModalContent(alertsMessages().invalidCredentialsMessage);
    });
});
