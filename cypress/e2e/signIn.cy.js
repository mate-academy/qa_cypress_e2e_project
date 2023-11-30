/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
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

  it('should not provide an ability to log in without email field', () => {
    signInPage.visit();

    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertUnSuccessModal('Email');
  });

  it('should not provide an ability to log in without password field', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();
    signInPage.assertUnSuccessModal('Password');
  });

  it('should not provide an ability to log in with not existing credentials'
    , () => {
      signInPage.visit();

      signInPage.typeEmail(newUser.email);
      signInPage.typePassword(newUser.password);
      signInPage.clickSignInBtn();
      signInPage.assertUnSuccessLogin();
    });
});
