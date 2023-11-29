/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const faker = require("faker");

describe("Sign Up page", () => {
  let user;

  before(() => {
    cy.task("db:clear");
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });
  });

  it("should provide an ability to registered user", () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it.only("should not provide an ability to registered with wrong credentials", () => {
    const wrongEmail = faker.lorem.word();

    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(wrongEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertErrorModalSignUp();
  });
});
