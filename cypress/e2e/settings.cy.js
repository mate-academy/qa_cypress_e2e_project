/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

const { faker } = require('@faker-js/faker');

describe('Settings page', () => {
  let user;

  const settingsData = {
    username: faker.person.firstName().toLowerCase(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    bio: faker.lorem.sentence()
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearUsernameField();
    settingsPage.fillUsernameField(settingsData.username);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertContainSuccessMessage();
    homePage.assertHeaderContainUsername(settingsData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(settingsData.bio);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertContainSuccessMessage();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmailField();
    settingsPage.fillEmailField(settingsData.email);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertContainSuccessMessage();
    settingsPage.clickSuccessMessageBth();
    settingsPage.assertEmailField();
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(settingsData.password);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.clickSuccessMessageBth();
    settingsPage.clickOnLogOutBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(settingsData.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogOutBtn();
    cy.contains('Sign in').should('be.visible');
  });
});
