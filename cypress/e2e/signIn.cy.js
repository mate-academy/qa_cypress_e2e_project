/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signInPage.visit();
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.visit();
    signInPage.typeEmail(user.newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertLoginFailed();
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newPassword);
    signInPage.clickSignInBtn();
    signInPage.assertLoginFailed();
  });

  it('should not provide an ability to log in with empty email', () => {
    signInPage.visit();
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertLoginEmptyEmail();
  });

  it('should not provide an ability to log in with empty password', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.assertLoginEmptyPassword();
  });
});
