/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const { faker } = require('@faker-js/faker');
const settinsPage = new SettingsPageObject();
const homePage = new HomePageObject();

let user;

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then(() => {
      cy.login(user.email, user.password, user.username);
    });
    settinsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();

    settinsPage.typeNewUsername(newUsername);

    settinsPage.clickSubmitButton();

    settinsPage.assertUsernameHasChanged(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.words(7);

    settinsPage.typeNewBio(newBio);

    settinsPage.clickSubmitButton();

    settinsPage.assertBioHasChanged(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.lorem.words(7);

    settinsPage.typeNewEmail(newEmail);

    settinsPage.clickSubmitButton();

    settinsPage.assertEmailHasChanged(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.lorem.words(7);

    settinsPage.typeNewPassword(newPassword);

    settinsPage.clickSubmitButton();

    settinsPage.assertPasswordHasChanged(newPassword);
  });

  it('should provide an ability to log out', () => {
    settinsPage.clickLogoutButton();

    homePage.assertUserLogout();
  });
});
