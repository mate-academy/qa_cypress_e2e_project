/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      signInPage.visit();

      cy.register(user.email, user.username, user.password);

      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      homePage.clickSettings();
    });
  });

  it('should provide an ability to update username', () => {
    const editedUsername = faker.lorem.words(1);
    settingsPage.usernameInput.clear().type(editedUsername);
    settingsPage.submitSettings();

    cy.contains('Update successful!');
    cy.contains('OK').click();

    homePage.assertHeaderContainUsername(editedUsername);
    cy.get('input[placeholder="Your username"]')
      .should('have.value', editedUsername);
  });

  it('should provide an ability to update bio', () => {
    const editedBio = faker.lorem.words(4);
    settingsPage.bioInput.clear().type(editedBio);
    settingsPage.submitSettings();

    cy.contains('Update successful!');
    cy.contains('OK').click();

    cy.get('textarea[placeholder="Short bio about you"]')
      .should('have.value', editedBio);
  });

  it('should provide an ability to update an email', () => {
    const editedEmail = faker.internet.email().toLowerCase();
    settingsPage.emailInput.clear().type(editedEmail);
    settingsPage.submitSettings();

    cy.contains('Update successful!');
    cy.contains('OK').click();

    cy.get('input[placeholder="Email"]').should('have.value', editedEmail);
  });

  it('should provide an ability to update password', () => {
    const editedPassword = 'Qwer123!';
    settingsPage.passwordInput.type(editedPassword);
    settingsPage.submitSettings();

    cy.contains('Update successful!');
    cy.contains('OK').click();

    settingsPage.logOutSettings();
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(editedPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });
});
