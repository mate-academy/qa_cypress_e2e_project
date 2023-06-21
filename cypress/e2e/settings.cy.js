/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {

let user; 
let newUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateNewUser').then(generateNewUser => {
        newUser = generateNewUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewUsername(newUser.username);
    settingsPage.clickUpdateSettings();
    settingsPage.checkSettingsUpdate();
    settingsPage.verifyNewUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewBio(newUser.bio);
    settingsPage.clickUpdateSettings();
    settingsPage.checkSettingsUpdate();
    settingsPage.verifyNewBio(newUser.bio);
  });

  it.only('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewEmail(newUser.email);
    settingsPage.clickUpdateSettings();
    settingsPage.checkSettingsUpdate();
    settingsPage.verifyNewEmail(newUser.email);
  })

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(newUser.email);
    settingsPage.clickUpdateSettings();
    settingsPage.checkSettingsUpdate();
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogOut();
    homePage.assertHomePageUrl();
  });
});
