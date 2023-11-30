/// <reference types='cypress' />
/// <reference types='../support' />

import PageObject from '../support/PageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.PageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
const faker = require('faker');

const pageObject = new PageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password);
    });
  });

  it('should provide an ability to update username', () => {
    cy.intercept('GET', '/tags').as('getHomePage');
    homePage.visit();
    cy.wait('@getHomePage').then(() => {
      const newUserName = 'alphasep23';

      settingsPage.visit();
      settingsPage.typeUserName(newUserName);
      settingsPage.clickUpdateSettingsBtn();

      pageObject.assertHeaderContainUsername(newUserName);
    });
  });

  it('should provide an ability to update bio', () => {
    cy.intercept('GET', '/tags').as('getHomePage');
    homePage.visit();
    cy.wait('@getHomePage').then(() => {
      settingsPage.visit();
      const newBio = faker.lorem.sentence();

      settingsPage.typeBio(newBio);
      settingsPage.clickUpdateSettingsBtn();

      cy.intercept('/user*').as('getDialog');
      cy.wait('@getDialog').then(() => {
        settingsPage.clickDialogBtn();
        cy.visit(`/#/@${user.username}`);
        profilePage.assertBio(newBio);
      });
    });
  });

  it('should provide an ability to update an email', () => {
    cy.intercept('GET', '/tags').as('getHomePage');
    homePage.visit();
    cy.wait('@getHomePage').then(() => {
      settingsPage.visit();
      const newEmail = faker.internet.email();

      settingsPage.typeEmail(newEmail);
      settingsPage.clickUpdateSettingsBtn();

      cy.intercept('/user*').as('getDialog');
      cy.wait('@getDialog').then(() => {
        settingsPage.clickDialogBtn();

        settingsPage.assertEmailField(newEmail);
      });
    });
  });

  it('should provide an ability to update password', () => {
    cy.intercept('GET', '/tags').as('getHomePage');
    homePage.visit();
    cy.wait('@getHomePage').then(() => {
      settingsPage.visit();
      const newPassword = 'Qwert!12345';
      settingsPage.typePassword(newPassword);
      settingsPage.clickUpdateSettingsBtn();

      cy.intercept('/user*').as('getDialog');
      cy.wait('@getDialog').then(() => {
        settingsPage.clickDialogBtn();
        settingsPage.clickLogoutBtn();
      });

      cy.login(user.email, newPassword);
      cy.visit(`/#/@${user.username}`);

      pageObject.assertHeaderContainUsername(user.username);
    });
  });

  it('should provide an ability to log out', () => {
    cy.intercept('GET', '/tags').as('getHomePage');
    homePage.visit();
    cy.wait('@getHomePage').then(() => {
      settingsPage.visit();
      settingsPage.clickLogoutBtn();

      pageObject.assertHeaderContainSignIn('Sign in');
    });
  });
});
