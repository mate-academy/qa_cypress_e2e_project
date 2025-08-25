/// <reference types="cypress" />
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Pass12345!'
    };

    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.visit();
  });

  it('should update bio', () => {
    const bio = faker.lorem.sentence();
    settingsPage.updateBio(bio);
    settingsPage.assertBio(bio);
  });

  it('should update username', () => {
    const newUsername = faker.internet.userName();
    settingsPage.updateUsername(newUsername);
    settingsPage.assertUsername(newUsername);
  });

  it('should update email', () => {
    const newEmail = faker.internet.email();
    settingsPage.updateEmail(newEmail);
    settingsPage.assertEmail(newEmail);
  });

  it('should update password', () => {
    const newPassword = 'NewPass123!';
    settingsPage.updatePassword(newPassword);
    settingsPage.assertPasswordUpdated();
  });
});
