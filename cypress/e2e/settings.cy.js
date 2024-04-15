/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const faker = require('faker');
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const successMessage = 'Update successful!';

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.lorem.word(6);

    settingsPage.usernameField.type(`{selectAll}${newUsername}`);
    settingsPage.updateBtn.click();
    settingsPage.assertModalWindow(successMessage);
    settingsPage.ModalWindow.type('{esc}');
    settingsPage.assertUsernameValue(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.words(6);

    settingsPage.bioField.type(`{selectAll}${newBio}`);
    settingsPage.updateBtn.click();
    settingsPage.assertModalWindow(successMessage);
    settingsPage.ModalWindow.type('{esc}');
    settingsPage.assertBioValue(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingsPage.emailField.type(`{selectAll}${newEmail}`);
    settingsPage.updateBtn.click();
    settingsPage.assertModalWindow(successMessage);
    settingsPage.ModalWindow.type('{esc}');
    settingsPage.assertEmailValue(newEmail); // there is a bug detected
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Pass123!';

    settingsPage.passwordField.type(`{selectAll}${newPassword}`);
    settingsPage.updateBtn.click();
    settingsPage.assertModalWindow(successMessage);
    settingsPage.ModalWindow.type('{esc}');
    cy.clearCookies();
    cy.reload();
    signInPage.visit();
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(newPassword);
    signInPage.signInBtn.click();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn.click();
    settingsPage.assertTokenIsRemoved();
  });
});
