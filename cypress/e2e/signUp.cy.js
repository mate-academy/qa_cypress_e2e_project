/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signUp.pageObject";

const faker = require('faker');
const signUpPage = new SignUpPageObject();

describe("Sign Up page", () => {
  let user;
  let user2;

  beforeEach(() => {
    cy.task("db:clear");
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });
    
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });

    signUpPage.visit();
  });

  it("should provide an ability to sign up", () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifySuccessfulRegistration("Welcome!");
  });

  it("should not provide an ability to sign up with empty username", () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration("Registration failed!");
  });

  it("should not provide an ability to sign up with empty email", () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration("Registration failed!");
  });

  it("should not provide an ability to sign up with empty password", () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration("Registration failed!");
  });

  it("should not provide an ability to sign up with password less than 8 ch", () => {

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.shortPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration("Registration failed!");
  });

  it("should not provide an ability to sign up with taken email", () => {
    cy.register(user.username, user.email, user.password);

    signUpPage.typeUsername(user2.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user2.password);
    signUpPage.clickSignUpBtn();
    signUpPage.verifyWrongRegistration("Registration failed!");
  });
});
