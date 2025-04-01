/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from "../support/pages/settings.pageObject";

describe("Settings page", () => {
  const settingsPage = new SettingsPageObject();

  let user;
  let settings;

  before(() => {
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });

    cy.task("generateSettings").then((generateSettings) => {
      settings = generateSettings;
    });
  });

  beforeEach(() => {
    const { email, username, password } = user;
    cy.task("db:clear");
    cy.visit("/#/login");
    cy.register(email, username, password).then(() => {
      cy.request("POST", "users/login", {
        user: {
          email,
          password,
        },
      }).then((response) => {
        cy.setCookie("drash_sess", response.body.user.token);
      });
    });

    cy.visit("/#/settings");
  });

  it("should provide an ability to update username", () => {
    settingsPage.changeUsername(settings.username);
    settingsPage.updateInfo();
    settingsPage.checkUpdate();
  });

  it("should provide an ability to update bio", () => {
    settingsPage.changeBio(settings.bio);
    settingsPage.updateInfo();
    settingsPage.checkUpdate();
  });

  it("should provide an ability to update an email", () => {
    settingsPage.changeEmail(settings.email);
    settingsPage.updateInfo();
    settingsPage.checkUpdate();
  });

  it("should provide an ability to update password", () => {
    settingsPage.changePassword(settings.password);
    settingsPage.updateInfo();
    settingsPage.checkUpdate();
  });

  it.only('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();

    settingsPage.checkNoUserName();

    settingsPage.checkSingInLink();
  });
});
