/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from "../support/pages/home.pageObject";
import SettingsPageObject from "../support/pages/settings.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;
  let updateUser;

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.password, user.username);
    });
    cy.task('generateUpdateUser').then((generateUpdateUser) => {
      updateUser = generateUpdateUser;
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeUsername(updateUser.username);

    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.visit();

    settingsPage.verifyUsernameUpdate(updateUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeBio(updateUser.bio);

    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.visit();

    settingsPage.verifyBiolUpdate(updateUser.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeEmail(updateUser.email);

    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.visit();

    settingsPage.verifyEmailUpdate(updateUser);

  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();

    settingsPage.typeNewPassword(updateUser);

    settingsPage.clickOnUpdateSettingsBtn();

  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();

    settingsPage.clickOnLogOutBtn();

    homePage.verifyUrl();
  });
});

