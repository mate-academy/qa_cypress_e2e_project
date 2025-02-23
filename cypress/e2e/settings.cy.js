/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPageObject();
const singInPage = new SignInPageObject();
const homePage = new HomePageObject();
const newUsername = faker.internet.userName();
const newEmail = faker.internet.email();
const newBio = faker.lorem.lines(4);
const newPassword = faker.internet.password();
const textUpdateSuccess = 'Update successful!';

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((response) => {
      user = response;

      cy.register(user.email, user.username, user.password);
      singInPage.visit();
      singInPage.typeEmail(user.email);
      singInPage.typePassword(user.password);
      singInPage.clickSignInBtn();
      homePage.pressSettingsLink();
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.usernameField.should('have.value', user.username);
    settingsPage.usernameField.clear();
    settingsPage.typeUsername(newUsername);
    settingsPage.pressUpdateBtn();
    settingsPage.swalModal.should('contain.text', textUpdateSuccess);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.should('be.visible');
    settingsPage.typeBio(newBio);
    settingsPage.pressUpdateBtn();
    settingsPage.swalModal.should('contain.text', textUpdateSuccess);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.should('have.value', user.email);
    settingsPage.emailField.clear();
    settingsPage.typeEmail(newEmail);
    settingsPage.pressUpdateBtn();
    settingsPage.swalModal.should('contain.text', textUpdateSuccess);
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField.should('be.visible');
    settingsPage.typePassword(newPassword);
    settingsPage.pressUpdateBtn();
    settingsPage.swalModal.should('contain.text', textUpdateSuccess);
  });

  it('should provide an ability to log out', () => {
    settingsPage.pressLogoutBtn();
    homePage.usernameLink.should('not.exist');
  });
});
