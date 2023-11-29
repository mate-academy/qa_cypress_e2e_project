/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from "../support/pages/settings.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import UserPageObject from "../support/pages/user.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const faker = require("faker");

describe("Settings page", () => {
  let user;

  before(() => {
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task("db:clear");
    cy.register(user.email, user.username, user.password);
    cy.login();
  });

  it("should provide an ability to update username", () => {
    const updateUsername = faker.lorem.word();

    settingsPage.visit();
    settingsPage.editUsername.clear();
    settingsPage.typeEditUsername(updateUsername);
    settingsPage.clickuUdateBtn();
    homePage.clickSuccessfullBtn();

    cy.clearCookies();

    signInPage.visit();

    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(updateUsername);
  });

  it.only("should provide an ability to update bio", () => {
    const newBio = faker.lorem.words();

    settingsPage.visit();
    settingsPage.editBio.type(newBio);
    settingsPage.clickuUdateBtn();
    homePage.clickSuccessfullBtn();

    cy.visit("/#/@riot/");
    userPage.updateBio.should("include", newBio);
  });

  it("should provide an ability to update an email", () => {
    const updateEmail = faker.internet.email();

    settingsPage.visit();
    settingsPage.editEmail.clear();
    settingsPage.typeEditEmail(updateEmail);
    settingsPage.clickuUdateBtn();
    homePage.clickSuccessfullBtn();

    cy.clearCookies();

    signInPage.visit();

    signInPage.emailField.type(updateEmail);
    signInPage.passwordField.type(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it("should provide an ability to update password", () => {
    const updatePassword = faker.internet.password();

    settingsPage.visit();
    settingsPage.editEmail.clear();
    settingsPage.typeEditPassword(updatePassword);
    settingsPage.clickuUdateBtn();
    homePage.clickSuccessfullBtn();

    cy.clearCookies();

    signInPage.visit();

    signInPage.emailField.type(user.emaill);
    signInPage.passwordField.type(updatePassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it("should provide an ability to log out", () => {
    cy.login();

    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    homePage.assertHomePageUrl();
  });
});
