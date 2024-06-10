/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from "../support/pages/home.pageObject";
import SignUpPageObject from "../support/pages/signUp.pageObject";
import alertsMessages from "../support/pages/alertMessages"; 

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe("Sign Up page", () => {
  let user;

  before(() => {
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task("db:clear");
    signUpPage.visit();
  });

  it("should provide an ability to sign up with valid data", () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertsMessages().successfulMessage);
    signUpPage.clickOkBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it("should not provide an ability to sign up with empty username field", () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
    signUpPage.assertModalContent(alertsMessages().emptyUsernameMessage);
    signUpPage.clickOkBtn();
  });

  it("should not provide an ability to sign up with empty email field", () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
    signUpPage.assertModalContent(alertsMessages().emptyEmailMessage);
    signUpPage.clickOkBtn();
  });

  it("should not provide an ability to sign up with empty password field", () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
    signUpPage.assertModalContent(alertsMessages().emptyPasswordMessage);
    signUpPage.clickOkBtn();
  });

  it("should not provide an ability to sign up with invalid email", () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.invalidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
    signUpPage.assertModalContent(alertsMessages().invalidEmailMessage);
    signUpPage.clickOkBtn();
  });

  it("should not provide an ability to sign up with existing email", () => {
    cy.register(user.email, user.username, user.password);
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
    signUpPage.assertModalContent(alertsMessages().takenEmailMessage);
    signUpPage.clickOkBtn();
  });

  it("should not provide an ability to sign up with invalid password", () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertModalContent(alertsMessages().registrationFailedMessage);
    signUpPage.assertModalContent(alertsMessages().longPasswordValidationMessage);
    signUpPage.clickOkBtn();
  });
});
