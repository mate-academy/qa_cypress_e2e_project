/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

const userData = {
  username: 'riot',
  email: 'riot@qa.team',
  password: '12345Qwert!',
  wrongEmail: 'riotqa.team',
  wrongPassword: 'qwert12345!'
};

describe('Sign Up page', () => {
  beforeEach(() => {
    homePage.clearDatabase();
    signUpPage.visit();
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.typeUsernameField(userData.username);
    signUpPage.typeEmailField(userData.email);
    signUpPage.typePasswordField(userData.password);
    signUpPage.clickSignUpBtn();

    homePage.assertUsernameLink(userData.username);
    homePage.assertHomePageUrl();
    signUpPage.assertSuccessfulRegistration(
      'Welcome!',
      'Your registration was successful!'
    );
  });

  it.only('should not provide an ability to register with wrong email', () => {
    signUpPage.typeUsernameField(userData.username);
    signUpPage.typeEmailField(userData.wrongEmail);
    signUpPage.typePasswordField(userData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertWrongEmail(
      'Registration failed!',
      'Email must be a valid email.'
    );
  });

  it.only('should not provide an ability to register with wrong password', () => {
    signUpPage.typeUsernameField(userData.username);
    signUpPage.typeEmailField(userData.email);
    signUpPage.typePasswordField(userData.wrongPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertWrongPassword(
      'Registration failed!',
      'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.'
    );
  });
});
