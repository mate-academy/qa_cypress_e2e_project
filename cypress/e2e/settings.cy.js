/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPage from '../support/pages/SettingsPage';
import SignInPage from '../support/pages/SignInPage';
import { faker } from '@faker-js/faker';

describe('Settings page tests', () => {
  const settingsPage = new SettingsPage();
  const signInPage = new SignInPage();
  const user = {
    email: 'testuser@example.com',
    password: 'Test@1234'
  };

  beforeEach(() => {
    cy.task('db:clear'); // czyszczenie bazy danych
    signInPage.visit();
    signInPage.signIn(user.email, user.password);
  });

  it('should update username', () => {
    const newUsername = faker.internet.userName();
    settingsPage.updateUsername(newUsername);
    settingsPage.assertUsernameUpdated(newUsername);
  });

  it('should update bio', () => {
    const newBio = faker.lorem.sentence();
    settingsPage.updateBio(newBio);
    settingsPage.assertBioUpdated(newBio);
  });

  it('should update email', () => {
    const newEmail = faker.internet.email();
    settingsPage.updateEmail(newEmail);
    settingsPage.assertEmailUpdated(newEmail);
  });

  it('should update password', () => {
    const newPassword = 'NewPass@123';
    settingsPage.updatePassword(newPassword);
    settingsPage.assertPasswordUpdated(newPassword); // np. poprzez wylogowanie i ponowne logowanie
  });

  it('should log out', () => {
    settingsPage.logOut();
    cy.url().should('include', '/login'); // sprawdzamy, że użytkownik został wylogowany
  });
});
