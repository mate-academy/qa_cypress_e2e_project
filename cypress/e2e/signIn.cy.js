/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from "../support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe("Sign In page", () => {
  let user;

  beforeEach(() => {
    cy.task("db:clear");

    cy.task("generateUser").then((generatedUser) => {
      user = generatedUser;

      return cy.register(user.email, user.username, user.password);
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
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword("WrongPassword123!");
    signInPage.clickSignInBtn();

    // The current Login.vue displays failed-login errors using SweetAlert.
    cy.get(".swal-modal", { timeout: 10000 }).should("be.visible");

    cy.get(".swal-title").should("contain.text", "Login failed!");
  });
});
