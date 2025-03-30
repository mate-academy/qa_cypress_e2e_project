/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    homePage.assertModal();
    homePage.assertModalWellcome('Welcome!');
    homePage
      .assertModalRegistrarionSuccessful('Your registration was successful!');

    homePage.clickConfirmButton();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('shouldn\'t provide an ability sign up with empty username', () => {
    signUpPage.visit();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    signUpPage.assertModalRegError();
    signUpPage.assertModalUserNameError();

    signUpPage.clickConfirmErrorButton();
  });

  it('shouldn\'t provide an ability sign up with empty email', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    signUpPage.assertModalRegError();
    signUpPage.assertModalEmailError();

    signUpPage.clickConfirmErrorButton();
  });

  it('shouldn\'t provide an ability sign up with empty password', () => {
    signUpPage.visit();

    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpButton();

    signUpPage.assertModalRegError();
    signUpPage.assertModalPasswordError();

    signUpPage.clickConfirmErrorButton();
  });
});
