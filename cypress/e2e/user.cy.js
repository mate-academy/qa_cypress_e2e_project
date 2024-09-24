/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from "../support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const { generateUser } = require("../support/generate.js");

describe("User", () => {
  let firstUser, secondUser;

  before(() => {
    cy.task("db:clear");
    firstUser = generateUser();
    secondUser = generateUser();
  });

  it("should be able to follow the another user", () => {
    cy.visit("/");
    cy.register(firstUser.email, firstUser.username, firstUser.password);

    cy.visit("/");
    cy.register(secondUser.email, secondUser.username, secondUser.password);

    signInPage.visit();
    signInPage.typeEmail(firstUser.email);
    signInPage.typePassword(firstUser.password);
    signInPage.clickSignInBtn();

    cy.wait(300);

    cy.visit(`/#/@${secondUser.username}/`);
    cy.get('[data-qa="followButtonProfilePage"]').click();

    cy.wait(300);
    cy.get('[data-qa="followButtonProfilePage"]').should(
      "not.contain",
      "Follow"
    );
  });
});
