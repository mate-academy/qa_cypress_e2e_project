/// <reference types="cypress" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should update username', () => {
    const newUsername = faker.internet.userName();
    settingsPage.visitPage();
    settingsPage.updateUsername(newUsername);
    settingsPage.assertUsername(newUsername);
    user.username = newUsername;
  });

  it('should update bio', () => {
    const newBio = faker.lorem.sentence();
    settingsPage.visitPage();
    settingsPage.updateBio(newBio);
  });

  it('should update email', () => {
    const newEmail = faker.internet.email();
    settingsPage.visitPage();
    settingsPage.updateEmail(newEmail);
    user.email = newEmail;
  });

  it('should update password', () => {
    const newPassword = faker.internet.password(8);
    settingsPage.visitPage();
    settingsPage.updatePassword(newPassword);
    user.password = newPassword;
  });

  it('should log out', () => {
    settingsPage.visitPage();
    settingsPage.logout();
    cy.url().should('include', '/login');
  });
});
