/// <reference types="cypress" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should log in with valid credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not log in with invalid credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword('WrongPassword123');
    signInPage.clickSignInBtn();

    signInPage.assertErrorContains('is invalid');
  });
});
