/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from "../support/pages/home.pageObject";
import SignUpPageObject from "../support/pages/signUp.pageObject";

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
  const wrongUsername = 'rodion';
  const wrongEmail = 'rodionmail.com';
  const wrongPassword = 'password';

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('shouldn\'t provide an ability to sign up with wrong username', () => {
    signUpPage.typeUsername(wrongUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.assertSignUpFailed();
  });

  it('shouldn\'t provide an ability to sign up with wrong email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();

    signUpPage.assertSignUpFailed();
  });

  it('shouldn\'t provide an ability to sign up with wrong password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(wrongPassword);

    signUpPage.clickSignUpBtn();

    signUpPage.assertSignUpFailed();
  });
});
