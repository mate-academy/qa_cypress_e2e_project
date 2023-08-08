/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let settings;
  let user;
  before(() => {
    return cy.task('generateSettings').then((generateSettings) => {
      settings = generateSettings;
    });
  });

  beforeEach(() => {
    return cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUsername(settings.username);
    settingsPage.clickupdateBtn();
    homePage.assertHeaderContainUsername(settings.username);
    settingsPage.assertUpdate();
    settingsPage.clickOkBtn();
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeBio(settings.bio);
    settingsPage.clickupdateBtn();
    settingsPage.assertUpdate();
    settingsPage.clickOkBtn();
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeEmail(settings.email);
    settingsPage.clickupdateBtn();
    settingsPage.assertUpdate();
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typePassword(settings.password);
    settingsPage.clickupdateBtn();
    settingsPage.assertUpdate();
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogOutBtn();
    settingsPage.assertLogOut();
    settingsPage.assertLogOut2();
  });
});
