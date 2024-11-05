/// <reference types="cypress" />
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

  it('should not provide an ability to log in with incorrect credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword('incorrectPassword');
    signInPage.clickSignInBtn();

    signInPage.checkWrong('Login failed!');

    signInPage.typeEmail('nonexistent@example.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.checkWrong('Login failed!');
  });
});
