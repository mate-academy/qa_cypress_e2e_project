/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to update username', () => {
    cy.task('generateUser').then((newUser) => {
      const newUsername = newUser.username;

      homePage.usernameLink.click();
      settingsPage.clickEditProfileSettingsBtn();
      cy.url().should('include', 'settings');

      settingsPage.updateUsername(newUsername);
      settingsPage.clickUpdateSettingsBtn();

      settingsPage.waitForSuccessMessage();
      homePage.visit();
      homePage.assertHeaderContainUsername(newUsername);
    });
  });

  it('should provide an ability to update bio', () => {
    cy.task('generateUser').then((newUser) => {
      const newBio = faker.lorem.sentence();

      homePage.usernameLink.click();
      settingsPage.clickEditProfileSettingsBtn();
      cy.url().should('include', 'settings');

      settingsPage.updateBio(newBio);
      settingsPage.clickUpdateSettingsBtn();

      settingsPage.waitForSuccessMessage();
      cy.visit(`/#/@${user.username}`);
      cy.getByDataQa('user-bio').should('contain', newBio);
    });
  });

  it('should provide an ability to update email', () => {
    cy.task('generateUser').then((newUser) => {
      const newEmail = faker.internet.email();

      homePage.usernameLink.click();
      settingsPage.clickEditProfileSettingsBtn();
      cy.url().should('include', 'settings');

      settingsPage.updateEmail(newEmail);
      settingsPage.clickUpdateSettingsBtn();

      settingsPage.waitForSuccessMessage();
      // Verify by logging out and logging back in with new email
      homePage.usernameLink.click();
      settingsPage.clickEditProfileSettingsBtn();
      settingsPage.clickLogoutBtn();

      signInPage.visit();
      signInPage.typeEmail(newEmail);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should provide an ability to update password', () => {
    cy.task('generateUser').then((newUser) => {
      const newPassword = faker.internet
        .password({ length: 12, memorable: false });

      homePage.usernameLink.click();
      settingsPage.clickEditProfileSettingsBtn();
      cy.url().should('include', 'settings');

      settingsPage.updatePassword(newPassword);
      settingsPage.clickUpdateSettingsBtn();

      settingsPage.waitForSuccessMessage();

      // Verify by logging out and logging back in with new password
      homePage.usernameLink.click();
      settingsPage.clickEditProfileSettingsBtn();
      settingsPage.clickLogoutBtn();

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(newPassword);
      signInPage.clickSignInBtn();

      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should provide an ability to log out', () => {
    homePage.usernameLink.click();
    settingsPage.clickEditProfileSettingsBtn();
    cy.url().should('include', 'settings');

    settingsPage.clickLogoutBtn();

    homePage.usernameLink.should('not.exist');
  });
});
