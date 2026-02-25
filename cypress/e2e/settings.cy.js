/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;
  let updatedUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(
        generateUser.email,
        generateUser.username,
        generateUser.password
      );
      cy.login({ email: generateUser.email, password: generateUser.password });
    });
    cy.task('generateUser').then((generateUser) => {
      updatedUser = generateUser;
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(updatedUser.username);
    settingsPage.updateSettings();

    homePage.clickUsernameLink();
    profilePage.assertH4ContainContent('username', updatedUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(updatedUser.bio);
    settingsPage.updateSettings();

    homePage.clickUsernameLink();
    profilePage.assertH4ContainContent('bio', updatedUser.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(updatedUser.email);
    settingsPage.updateSettings();

    homePage.clickSettingsLink();

    settingsPage.assertEmailFieldContainUpdatedEmail(updatedUser.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(updatedUser.password);
    settingsPage.updateSettings();
    settingsPage.clickLogoutBtn();

    cy.login({
      email: user.email,
      password: updatedUser.password
    });
    settingsPage.visit();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.assertUsernameLinkNotExist();
  });
});
