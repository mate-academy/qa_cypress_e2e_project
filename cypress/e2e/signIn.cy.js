/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from "../support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const faker = require("faker");

describe("Sign In page", () => {
  let user;

  before(() => {
    cy.task("db:clear");
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  it("should provide an ability to log in with existing credentials", () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it("should not provide an ability to log in with wrong credentials", () => {
    const wrongEmail = faker.internet.email();

    signInPage.visit();

    signInPage.emailField.type(wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertErrorModalSignIn();
  });
});
