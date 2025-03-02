/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      settingsPage.visit();
    });
  });
  const newUser = {
    newUserName: faker.name.firstName().toLowerCase(),
    newBio: faker.lorem.words(),
    newEmail: faker.internet.email().toLowerCase(),
    newPassword: 'Qwert12345!'
  };

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(newUser.newUserName);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(newUser.newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newUser.newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.checkSuccess('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newUser.newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.checkSuccess('Update successful!');
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(newUser.newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.checkSuccess('Update successful!');
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.assertHeaderNotContainUsername();
  });
});
