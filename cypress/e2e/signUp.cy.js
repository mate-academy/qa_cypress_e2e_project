/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const incorrectEmail = "emailexample.com";
const emailWithoutDot = "email@examplecom";
const tooShortPassword = "Qwert1!";
const passwordWithoutNumber = "Qwertyu!";

const userData = {
  username: faker.internet.userName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password()
};

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to regisrter with valid credentials', () => {
    signUpPage.visit();

    signUpPage.typeUsername(userData.username);
    signUpPage.typeEmail(userData.email);
    signUpPage.typePassword(userData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertSuccessfulRegistration();
    homePage.assertHeaderContainUsername(userData.username);

  });

  it('should not provide an ability to regisrter with empty username field', () => {
    signUpPage.visit();

    signUpPage.typeEmail(userData.email);
    signUpPage.typePassword(userData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnsuccessfulRegistration("Username field required.");
  });

  it('should not provide an ability to regisrter with empty email field', () => {
    signUpPage.visit();

    signUpPage.typeUsername(userData.username);
    signUpPage.typePassword(userData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnsuccessfulRegistration("Email field required.");
  });

  it('should not provide an ability to regisrter with empty password field', () => {
    signUpPage.visit();

    signUpPage.typeUsername(userData.username);
    signUpPage.typeEmail(userData.email);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnsuccessfulRegistration("Password field required.");
  });

  it('should not provide an ability to regisrter wwith email without .', () => {
    signUpPage.visit();

    signUpPage.typeUsername(userData.username);
    signUpPage.typeEmail(emailWithoutDot);
    signUpPage.typePassword(userData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnsuccessfulRegistration("Email must be a valid email.");
  });

  it('should not provide an ability to regisrter with email without @', () => {
    signUpPage.visit();

    signUpPage.typeUsername(userData.username);
    signUpPage.typeEmail(incorrectEmail);
    signUpPage.typePassword(userData.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnsuccessfulRegistration("Email must be a valid email.");
  });

  it('should not provide an ability to regisrter with password with 7 symbols', () => {
    signUpPage.visit();

    signUpPage.typeUsername(userData.username);
    signUpPage.typeEmail(userData.email);
    signUpPage.typePassword(tooShortPassword);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnsuccessfulRegistration("Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.");
  });

  it('should not provide an ability to regisrter with password without number', () => {
    signUpPage.visit();

    signUpPage.typeUsername(userData.username);
    signUpPage.typeEmail(userData.email);
    signUpPage.typePassword(passwordWithoutNumber);
    signUpPage.clickSignUpBtn();

    signUpPage.assertUnsuccessfulRegistration("Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.");
  });
});
