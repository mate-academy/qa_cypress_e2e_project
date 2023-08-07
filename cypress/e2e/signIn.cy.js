/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

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

  // eslint-disable-next-line max-len
  it.only('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    signInPage.typeEmail('wrongemail@example.com');
    signInPage.typePassword('wrongpassword');
    signInPage.clickSignInBtn();

    cy.contains('Invalid user credentials.').should('be.visible');
    cy.url().should('include', '/#/login');
    cy.get('.swal-modal').should('be.visible');
    cy.contains('.swal-title', 'Login failed!').should('be.visible');
    cy.contains('.swal-text', 'Invalid user credentials.').should('be.visible');
    cy.get('.swal-modal button.swal-button--confirm').click();
  });
});
