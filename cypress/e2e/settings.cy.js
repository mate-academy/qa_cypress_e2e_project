/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

const testData = {
  username: faker.internet.userName(),
  bio: faker.lorem.words(5),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 8 })
};

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.registrationAndAuthorization();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeNewUsername(testData.username);
    settingsPage.clickUpdateSettingsBtn();

    homePage.assertHeaderContainUsername(testData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(testData.bio);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertValidationPopUp();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeNewEmail(testData.email);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertValidationPopUp();
  });

  it('should provide an ability to update password', () => {
    settingsPage.typeNewPassword(testData.password);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertValidationPopUp();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    homePage.assertHeaderHasNoUsernameLink();
  });
});
