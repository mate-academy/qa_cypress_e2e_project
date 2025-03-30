/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import PageObject from "../support/PageObject";

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const pageObject = new PageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUp();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with the password less than 8 characters', () => {
    const lessPassword = "QWer123";

    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(lessPassword);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.");
  });

  it('should not provide an ability to sign up with the password without lowercase characters', () => {
    const passwordWithoutLowercase = "QWER1234";

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(passwordWithoutLowercase);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.");
  });

  it('should not provide an ability to sign up with the password without lowercase characters', () => {
    const passwordWithoutUppercase = "qwer1234";

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(passwordWithoutUppercase);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.");
  });

  it('should not provide an ability to sign up with the password without lowercase characters', () => {
    const passwordWithoutNumbers = "QWERqwer";

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(passwordWithoutNumbers);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.");
  });

  it('should not provide an ability to sign up with the email without "@" character', () => {
    const emailWithoutDoggy = "yuragmail.com";

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutDoggy);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Email must be a valid email.");
  });

  it('should not provide an ability to sign up without "@" character in the email field', () => {
    const emailWithoutDoggy = "yuragmail.com";

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutDoggy);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Email must be a valid email.");
  });

  it('should not provide an ability to sign up without username part in the email field', () => {
    const emailWithoutUsernamePart = "@gmail.com";

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutUsernamePart);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Email must be a valid email.");
  });

  it('should not provide an ability to sign up without domain part in the email field', () => {
    const emailWithoutDomainPart = "yura@gmail.";

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutDomainPart);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Email must be a valid email.");
  });

  it('should not provide an ability to sign up without "." character in the email field', () => {
    const emailWithoutDot = "yura@gmailcom";

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutDot);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Email must be a valid email.");
  });


  it('should not provide an ability to sign up with already taken username', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.newEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Username already taken.");
  });

  it('should not provide an ability to sign up with already taken email', () => {
    cy.register(user.email, user.username, user.password);

    signUpPage.typeUsername(user.newUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUp();

    pageObject.assertErrorWindow("Email already taken.");
  });
});
