/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    // Очищаем базу данных перед тестами
    cy.task('db:clear');

    // Генерируем нового пользователя для тестов
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    // Логиним пользователя перед каждым тестом
    cy.login(user.email, user.password);
    settingsPage.visit();
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
    // После изменения пароля пробуем заново войти
    cy.logout();
    cy.login(user.email, newPassword);
    settingsPage.assertLoggedIn();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogout();
    cy.url().should('include', '/#/login');
  });
});
