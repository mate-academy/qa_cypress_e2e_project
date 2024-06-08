/// <reference types="cypress" />
/// <reference types="../support" />

import { homePage } from '../support/pages//ProjectPages/HomePage';
import { settingsPage } from '../support/pages/ProjectPages/SettingsPage';
import { signInPage } from '../support/pages/ProjectPages/SignInPage';

describe('Settings page', () => {
  let user;
  let edit;

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(5);
    cy.register(user.email, user.username, user.password);
  });
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('editUser').then((editUser) => {
      edit = editUser;
    });
  });

  it('should provide an ability to update username', () => {
    homePage.visitSetingsPage();
    settingsPage.ChangeUsernameField(edit);
    settingsPage.ClickUpdateSettings();
    cy.get('.swal-title').should('contain', 'Update successful!');
  });

  it('should provide an ability to update bio', () => {
    homePage.visitSetingsPage();
    settingsPage.ChangeBioField(edit);
    settingsPage.ClickUpdateSettings();
    settingsPage.AssertChanges();
  });

  it('should provide an ability to update an email', () => {
    homePage.visitSetingsPage();
    settingsPage.ChangeemailField(edit);
    settingsPage.ClickUpdateSettings();
    settingsPage.AssertChanges();
    settingsPage.ClickLogOutBtn();
    homePage.visitLoginPage();
    signInPage.typeModEmail(edit);
    signInPage.typePassword(user);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to update password', () => {
    homePage.visitSetingsPage();
    settingsPage.ChangePasswordField(edit);
    settingsPage.ClickUpdateSettings();
    settingsPage.AssertChanges();
    settingsPage.ClickLogOutBtn();
    homePage.visitLoginPage();
    signInPage.typeEmail(user);
    signInPage.typeModPassword(edit);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to log out', () => {
    homePage.visitSetingsPage();
    settingsPage.ClickLogOutBtn();
    cy.getCookie('auth').should('not.exist');
  });
});
