/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
const faker = require('faker');

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;
  const userNew = {
    username: faker.name.firstName(),
    bio: faker.lorem.words(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.usernameSettings(userNew.username);
    settingsPage.clickOnUpdateBtn();
    settingsPage.messageWindow.should('contain', 'Update successful!');
    settingsPage.clickOkBtn();
    homePage.usernameLink.should('contain', userNew.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.bioSettings(userNew.bio);
    settingsPage.clickOnUpdateBtn();
    settingsPage.messageWindow.should('contain', 'Update successful!');
    settingsPage.clickOkBtn();
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.emailSettings(userNew.email);
    settingsPage.clickOnUpdateBtn();
    settingsPage.messageWindow.should('contain', 'Update successful!');
    settingsPage.clickOkBtn();
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.passwordSettings(userNew.password);
    settingsPage.clickOnUpdateBtn();
    settingsPage.messageWindow.should('contain', 'Update successful!');
    settingsPage.clickOkBtn();
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickOnLogOutBtn();
    homePage.visit();
    homePage.navMenu.should('contain', 'Sign in')
      .and('contain', 'Sign in')
      .and('contain', 'Home');
  });
});
