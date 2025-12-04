/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    // Очищаем базу перед каждым тестом
    cy.task('db:clear');

    // Генерируем и регистрируем нового пользователя
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateSettings();
    settingsPage.assertUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();
    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettings();
    settingsPage.assertBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateSettings();
    settingsPage.assertEmail(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();
    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettings();
    cy.logout();
    cy.login(user.email, newPassword);
    settingsPage.assertLoggedIn();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogout();
    cy.url().should('include', '/#/login');
  });
});
