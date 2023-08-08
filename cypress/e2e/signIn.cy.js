/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

const userDataWrong = {
  email: 'InvalidData',
  password: 'Qwert'
};

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    homePage.clearDatabase();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHomePageUrl();
    homePage.assertUsernameLink(user.username);
  });

    it('should not provide an ability to log in with invalid Email', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(userDataWrong.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertMessageWrongEmailData();
  });

  it('should not provide an ability to log in with invalid Password', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(userDataWrong.password);
    signInPage.clickSignInBtn();

    signInPage.assertMessageWrongPasswordData();
  });

  it('should not provide an ability to log in with empty Email field', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertMessageEmptyEmail();
  });

  it('should not provide an ability to log in with empty Password field', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();

    signInPage.assertMessageEmptyPassword();
  });
});