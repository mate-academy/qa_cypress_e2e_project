/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from "../support/pages/settings.pageObject.js";
import SignInPageObject from "../support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe("Settings page", () => {
  let user;

  beforeEach(() => {
    cy.task("db:clear");
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  it("should provide an ability to update username", () => {
    settingsPage.typeUserName(user.updatedUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.clickOkBtn();
    settingsPage.assertUpdatedUsername(user.updatedUsername);
  });

  it("should provide an ability to update bio", () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.clickOkBtn();
    settingsPage.assertUpdatedBio(user.bio);
  });

  it("should provide an ability to update an email", () => {
    settingsPage.typeEmail(user.updatedEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.clickOkBtn();
    settingsPage.assertUpdatedEmail(user.updatedEmail);
  });

  it("should provide an ability to update password", () => {
    settingsPage.typePassword(user.updatedPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.clickOkBtn();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.updatedPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it("should provide an ability to log out", () => {
    settingsPage.clickLogoutBtn();
    settingsPage.assertHeaderNotContainUsername(user.username);
  });
});
