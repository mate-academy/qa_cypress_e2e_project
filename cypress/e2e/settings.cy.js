/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from "../support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import SettingsPageObject from "../support/pages/settings.pageObject.js";

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe("Settings page", () => {
  let user;
  const successfulUpdateMessage = "Update successful!";

  before(() => {
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task("db:clear");

    cy.register(user.email, user.username, user.password);

    settingsPage.visit("");
  });

  it("should provide an ability to update username", () => {
    settingsPage.typeUserName(user.updatedUsername);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(user.updatedUsername);
  });

  it("should provide an ability to update bio", () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdatedBioField(user.bio);
  });

  it("should provide an ability to update an email", () => {
    settingsPage.typeEmail(user.updatedEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdatedEmailField(user.updatedEmail);
  });

  it("should provide an ability to update password", () => {
    settingsPage.typePassword(user.updatedPassword);
    settingsPage.clickUpdateBtn();
  });

  it("should provide an ability to log out", () => {
    settingsPage.visit("");
    settingsPage.clickLogoutBtn();
    settingsPage.assertHeaderContainUsername(user.username);
    cy.getCookie("auth").should("not.exist");
  });
});
