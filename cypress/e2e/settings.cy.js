/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from "../support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import SettingsPageObject from "../support/pages/settings.pageObject.js";

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const { generateUser } = require("../support/generate.js");

describe("Settings page", () => {
  let createdUser, updatedUser;
  const successfulUpdateMessage = "Update successful!";

  before(() => {
    cy.task("db:clear");
    createdUser = generateUser();
    updatedUser = generateUser();

    cy.register(createdUser.email, createdUser.username, createdUser.password);
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(createdUser.email);
    signInPage.typePassword(createdUser.password);
    signInPage.clickSignInBtn();
  });

  it("should provide an ability to update username", () => {
    cy.get('[data-qa="SettingsHeader"]').click();
    settingsPage.typeUserName(updatedUser.username);
    settingsPage.clickUpdateBtn();
  });

  it("should provide an ability to update bio", () => {
    cy.get('[data-qa="SettingsHeader"]').click();
    settingsPage.typeBio(updatedUser.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdatedBioField(updatedUser.bio);
  });

  it("should provide an ability to update an email", () => {
    cy.get('[data-qa="SettingsHeader"]').click();
    settingsPage.typeEmail(updatedUser.email);
    settingsPage.clickUpdateBtn();
  });

  it("should provide an ability to update password", () => {
    cy.get('[data-qa="SettingsHeader"]').click();
    settingsPage.typePassword(updatedUser.password);
    settingsPage.clickUpdateBtn();
  });

  it("should provide an ability to log out", () => {
    cy.get('[data-qa="SettingsHeader"]').click();
    settingsPage.clickLogoutBtn();
    cy.getCookie("auth").should("not.exist");
  });
});
