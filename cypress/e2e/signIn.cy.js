/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

const userData = {
  email: 'riot1@qa.team',
  password: 'Qwert12345!'
};

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    homePage.clearDatabase();
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmailField(user.email);
    signInPage.typePasswordField(user.password);
    signInPage.clickSignInBtn();

    homePage.assertUsernameLink(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmailField(userData.email);
    signInPage.typePasswordField(userData.password);
    signInPage.clickSignInBtn();

    signInPage.assertWrongData(
      'Login failed!', 
      'Invalid user credentials.'
    );
  });
});
