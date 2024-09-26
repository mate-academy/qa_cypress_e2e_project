/// <reference types="cypress" />
/// <reference types="../support" />
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
      // User registration before login tests
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    // We use the method from HomePageObject to check whether username is visible
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword('wrongpassword');
    signInPage.clickSignInBtn();

    cy.get('.swal-title').should('contain', 'Login failed!');
  });
});