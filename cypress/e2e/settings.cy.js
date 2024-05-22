/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.password);
      });
    });
  });

  it('should provide an ability to update username', () => {
    const userName = faker.name.firstName().toLowerCase();
    settingsPage.visit();
    settingsPage.typeUsername(userName);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertUpdate();
  });

  it('should provide an ability to update bio', () => {
    const bio = faker.lorem.paragraph().toLowerCase();
    settingsPage.visit();
    settingsPage.typeBio(bio);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertUpdate();
  });

  it('should provide an ability to update an email', () => {
    const email = faker.internet.email().toLowerCase();
    settingsPage.visit();
    settingsPage.typeEmail(email);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertUpdate();
  });

  it('should provide an ability to update password', () => {
    const password = faker.internet.password();
    settingsPage.visit();
    settingsPage.typePassword(password);
    settingsPage.clickOnUpdateSettingsButton();
    settingsPage.assertUpdate();
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickOnLogoutButton();
    homePage.usernameLink.should('not.exist');
  });
});
