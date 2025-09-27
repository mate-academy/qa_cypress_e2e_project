/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SwalMessagePageObject from '../support/swalMessages/SwalMessages.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const swalMessage = new SwalMessagePageObject();

describe('Settings page', () => {
  let user;
  let newUserData;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
    cy.task('generateUser').then((generateUser) => {
      newUserData = generateUser;
      newUserData.bio = faker.lorem.paragraph({ min: 1, max: 3 });
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(newUserData.username);

    settingsPage.clickUpdateSettingsBtn();

    swalMessage.updatingSuccess();
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(newUserData.bio);

    settingsPage.clickUpdateSettingsBtn();

    swalMessage.updatingSuccess();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newUserData.email);

    settingsPage.clickUpdateSettingsBtn();

    swalMessage.updatingSuccess();
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(newUserData.password);

    settingsPage.clickUpdateSettingsBtn();

    swalMessage.updatingSuccess();
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();

    homePage.isConduitHomePage();
  });
});
