/// <reference types="cypress" />
/// <reference types="../support" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  const signInPage = new SignInPageObject();
  const homePage = new HomePageObject();

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();
    homePage.usernameLink.should('contain', user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();

    cy.get('.swal-modal').should('contain', 'Login failed');
  });
});
