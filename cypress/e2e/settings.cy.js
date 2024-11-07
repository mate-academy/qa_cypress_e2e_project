/// <reference types='cypress' />
/// <reference types='../support' />
import SettingsPageObject from "../support/pages/settings.PageObject";
import HomePageObject from "../support/pages/home.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe("Settings page", () => {
  let user;
  before(() => {
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task("db:clear");
    cy.visit("/#/register");
    cy.registerAndLogin(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it("should provide an ability to update username", () => {
    settingsPage.typeUsername(user.username);
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it("should provide an ability to update bio", () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateSettingsBtn();
  });

  it("should provide an ability to update an email", () => {
    settingsPage.typeEmail(user.email);
    settingsPage.clickUpdateSettingsBtn();
  });

  it("should provide an ability to update password", () => {
    settingsPage.typePassword(user.password);
    settingsPage.clickUpdateSettingsBtn();
  });

  it("should provide an ability to log out", () => {
    settingsPage.clickLogoutBtn();
    settingsPage.assertLogout("/#/");
  });
});
