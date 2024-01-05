
/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
  });

  let userRegistered;
  let updatedUser;

  beforeEach(() => {
    homePage.visit();
    cy.task('generateUser').then((newUser) => {
      cy.register2(newUser);
      userRegistered = newUser;
      cy.login2(userRegistered);
      cy.reload();
    });
    cy.task('generateUser').then((newUser) => {
      updatedUser = newUser;
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserName(updatedUser.username);
    settingsPage.clickUpdateSettings();
    settingsPage.clickOk();
    cy.getByDataCy('username-link')
      .should('contain', updatedUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(updatedUser.bio);
    settingsPage.clickUpdateSettings();
    settingsPage.clickOk();
    cy.getByDataCy('settingsBio')
      .should('have.value', updatedUser.bio);
  });

  // bug, email doesn't update
  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(updatedUser.email);
    settingsPage.clickUpdateSettings();
    settingsPage.clickOk();
    cy.getByDataCy('settingsEmail')
      .should('have.value', updatedUser.email);
    cy.request({
      method: 'POST',
      url: '/users/login',
      body: {
        email: userRegistered.email,
        password: userRegistered.password
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(422);
    });
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword('NewPassword1234!');
    settingsPage.clickUpdateSettings();
    settingsPage.clickOk();
    cy.reload();
    // check if can login with old password
    cy.request({
      method: 'POST',
      url: '/users/login',
      body: {
        user: {
          email: userRegistered.email,
          password: userRegistered.password
        }
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(422);
    });
  });
});
