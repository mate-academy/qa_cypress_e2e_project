/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
      newUser.password = 'NewP@ssword1';
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.registerAndLogin(user.email, user.username, user.password);
      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(newUser.username);
    settingsPage.clickUpdateSettingsButton();

    settingsPage.assertAllertMessage('Update successful!');
    homePage.assertHeaderContainUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newUser.bio);
    settingsPage.clickUpdateSettingsButton();

    settingsPage.assertAllertMessage('Update successful!');
    settingsPage.assertUserHasBio(newUser.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newUser.email);
    settingsPage.clickUpdateSettingsButton();

    settingsPage.assertAllertMessage('Update successful!');
    cy.clearAllCookies().reload();
    cy.login(newUser.email, user.password);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(newUser.password);
    settingsPage.clickUpdateSettingsButton();

    settingsPage.assertAllertMessage('Update successful!');
    cy.clearAllCookies().reload();
    cy.login(user.email, newUser.password).then(() => {
      settingsPage.visit();
      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutButton();

    homePage.assertNavbarDoesntContain(user.username);
    homePage.assertNavbarContainLink('Sign in');
    homePage.assertNavbarContainLink('Sign up');
  });
});
