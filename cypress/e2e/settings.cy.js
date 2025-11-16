/// <reference types='cypress' />
/// <reference types='../support' />

import {
  faker
} from '@faker-js/faker';

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  const user = {
    username: faker.person.firstName().toLowerCase(),
    bio: faker.lorem.word(),
    email: `${faker.internet.userName().toLowerCase()}@mail.com`,
    password: `${faker.lorem.word()}123!`
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((userData) => {
      cy.wrap(userData).as('userData').then((userData) => {
        cy.login(userData.email, userData.username, userData.password);
      });
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearUsername();
    settingsPage.typeUsername(user.username);
    settingsPage.clickInUpdateSettings();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clearBio();
    settingsPage.typeBio(user.bio);
    settingsPage.clickInUpdateSettings();
    settingsPage.assertContainBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmail();
    settingsPage.typeEmail(user.email);
    settingsPage.clickInUpdateSettings();
    settingsPage.assertUpdatedSettings();
    settingsPage.visit();
    settingsPage.assertContainEmail(user.email);
  });

  it('should provide an ability to update password', () => {
    cy.get('@userData').then((userData) => {
      settingsPage.clearPassword();
      settingsPage.typeNewPassword(user.password);
      settingsPage.clickInUpdateSettings();
      settingsPage.visit();
      settingsPage.clickInLogout();
      signInPage.visit();
      signInPage.typeEmail(userData.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
    });
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickInLogout();
    settingsPage.assertLoggedOutUser();
  });
});
