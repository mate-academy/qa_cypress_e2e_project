/// <reference types="cypress" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
      signInPage.signIn(user.email, user.password);
    });
  });

  it('should update bio', () => {
    const newBio = faker.lorem.sentence();
    settingsPage.visitPage();
    settingsPage.updateBio(newBio);
    settingsPage.assertBio(newBio);
  });

  it('should update email', () => {
    const newEmail = faker.internet.email();
    settingsPage.visitPage();
    settingsPage.updateEmail(newEmail);

    settingsPage.logout();
    signInPage.signIn(newEmail, user.password);
    cy.contains(newEmail).should('exist');
  });

  it('should update password', () => {
    const newPassword = faker.internet.password();
    settingsPage.visitPage();
    settingsPage.updatePassword(newPassword);

    settingsPage.logout();
    signInPage.signIn(user.email, newPassword);
    cy.contains(user.username).should('exist');
  });
});
