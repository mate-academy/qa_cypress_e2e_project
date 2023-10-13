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

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    signInPage.typeEmail('randomEmail@mail.com')
    signInPage.typePassword('testPass21');
    signInPage.clickSignInBtn();

    cy.get('.swal-modal').contains('Invalid user credentials.');
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.visit();

    signInPage.typeEmail('wrongEmail@mail.com')
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.get('.swal-modal').contains('Invalid user credentials.');
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword('wrongPassword');
    signInPage.clickSignInBtn();

    cy.get('.swal-modal').contains('Invalid user credentials.');
  })

  it('should redirect to the "Sign Up" page', () => {
    signInPage.visit();

    signInPage.clickRegisterLink();

    cy.url().should('contain', '/#/register');
  });
});
