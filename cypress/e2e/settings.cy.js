/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser')
      .then((generatedUser) => {
        user = generatedUser;
        return cy.register(user.email, user.username, user.password);
      })
      .then(() => {
        settingsPage.visit();
        settingsPage.login(user.email, user.password);
        settingsPage.navSettingsBtn.should('be.visible').click();
        settingsPage.userSettingsTitle.should('have.text', 'Your Settings');
      });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.person.firstName();

    settingsPage.updateField(settingsPage.userNameField, newUsername);
    settingsPage.updatedMessage.should('have.text', 'Update successful!');
    settingsPage.swalButton.should('be.visible').click();
  });

  it('should provide an ability to update bio', () => {
    const newUserBio = faker.lorem.words();

    settingsPage.updateField(settingsPage.userBioField, newUserBio);
    settingsPage.updatedMessage.should('have.text', 'Update successful!');
    settingsPage.swalButton.should('be.visible').click();
  });

  it('should provide an ability to update an email', () => {
    const newUserEmail = faker.internet.email();

    settingsPage.updateField(settingsPage.userEmailField, newUserEmail);
    settingsPage.updatedMessage.should('have.text', 'Update successful!');
    settingsPage.swalButton.should('be.visible').click();
  });

  it('should provide an ability to update password', () => {
    const newUserPassword = faker.internet.password();

    settingsPage.updateField(settingsPage.userPasswordField, newUserPassword);
    settingsPage.updatedMessage.should('have.text', 'Update successful!');
    settingsPage.swalButton.should('be.visible').click();
  });

  it('should provide an ability to log out', () => {
    settingsPage.userLogoutBtn.should('be.visible').click();

    cy.url().should('not.include', '/#/settings');
  });
});
