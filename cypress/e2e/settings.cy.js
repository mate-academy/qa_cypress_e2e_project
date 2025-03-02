/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPageObject();
let user;

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
    user = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(10),
      bio: faker.lorem.sentence()
    };

    cy.register(user.email, user.username, user.password);
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentences(2);
    settingsPage.typeBio(newBio);
    settingsPage.submitForm();

    settingsPage.assertProfilePage();
    cy.get('[data-cy=bio-settings]').should('contain.text', newBio);
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();
    settingsPage.typeUsername(newUsername);
    settingsPage.submitForm();

    settingsPage.assertProfilePage(newUsername);
    cy.get('[data-cy=username-settings]').should('contain.text', newUsername);
    user.username = newUsername;
  });

  it('should provide an ability to update email', () => {
    const newEmail = faker.internet.email();
    settingsPage.typeEmail(newEmail);
    settingsPage.submitForm();

    settingsPage.assertProfilePage(user.username);
    cy.get('[data-cy=email-settings]').should('contain.text', newEmail);

    user.email = newEmail;
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password(10);
    settingsPage.typePassword(newPassword);
    settingsPage.submitForm();

    cy.logout();
    cy.login(user.email, user.username, newPassword);

    user.password = newPassword;
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();
    cy.url().should('include', '/');
  });
});

