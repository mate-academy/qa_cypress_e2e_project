/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import PopUpPageObject from '../support/pages/popUp.pageObjects';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const popUp = new PopUpPageObject();
const signUpPage = new SignUpPageObject();

describe('Sign In page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    homePage.signInBtnClick();
  });

  it('should redirect user on Sign Up page by clicking on the Need an account?',
    () => {
      signInPage.clickNeedAccountLink();

      signUpPage.assertSignUpPage();
    });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.signInProcess();

    homePage.assertHeaderContainUsername(signInPage.genData.user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.signInProcess('without registration');

    popUp.popUpAssert('sign in: not valid credentials');
  });

  it('should not provide an ability to log in without email', () => {
    signInPage.signInProcess('without email');

    popUp.popUpAssert('sign in: without email');
  });

  it('should not provide an ability to log in without password', () => {
    signInPage.signInProcess('without password');

    popUp.popUpAssert('sign in: without password');
  });
});
