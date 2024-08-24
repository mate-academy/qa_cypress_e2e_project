/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const btnNames = require('../fixtures/buttonNames.json');
const validation = require('../fixtures/validationMessages.json');
const pageTitle = require('../fixtures/pageTitles.json');

const profilePage = new ProfilePageObject();
const settings = new SettingsPageObject();
const homePage = new HomePageObject();

describe(`Settings page`, () => {
  let newUserData;

  before(() => {
    cy.task('generateUserData').then((userData) => {
      newUserData = userData;
    });
  });

  beforeEach(() => {
    cy.wrap(Cypress.currentTest.title).as('testTitle');

    cy.task('db:clear');

    cy.task('generateUserData').as('userData').then((user) => {
      const userData = user;

      cy.authorization(userData);
    });

    settings.visit();
  });

  it(`should contain main components`, function () {
    settings.assertPageUrl(settings.url);
    settings.assertPageTitle(pageTitle.settingsTitle);
    settings.assertSettingsFormExists(this.userData, btnNames.updateSettings);
    settings.assertLogoutBtnExists(btnNames.logout);
  });

  it(`should allow to update username`, () => {
    const { username: newUsername } = newUserData;

    settings.typeUsername(newUsername);
    settings.clickOnUpdateBtn();
    settings.assertSuccessfulMessage(validation.success.updatingUserData);
    settings.clickOnOkeyBtn();
    settings.assertUsernameUpdated(newUsername);
    settings.assertHeaderContainUsername(newUsername);
    settings.clickOnUsernameLink();

    profilePage.assertUsernameUpdated(newUsername);
  });

  it(`should allow to update bio`, function () {
    const { bio } = this.userData;

    settings.typeBio(bio);
    settings.clickOnUpdateBtn();
    settings.assertSuccessfulMessage(validation.success.updatingUserData);
    settings.clickOnOkeyBtn();
    settings.assertBioUpdated(bio);
    settings.clickOnUsernameLink();

    profilePage.assertUpdatedBioExists(bio);
  });

  it(`should allow to update an email`, function () {
    const { email: { normalEmail } } = newUserData;

    settings.typeEmail(normalEmail);
    settings.clickOnUpdateBtn();
    settings.assertSuccessfulMessage(validation.success.updatingUserData);
    settings.clickOnOkeyBtn();
    settings.assertEmailUpdated(normalEmail, this.userData);
  });

  it(`should allow to update password`, function () {
    const { password: { normalPassword } } = newUserData;

    settings.typePassword(normalPassword);
    settings.assertPasswordIsmasked();
    settings.clickOnUpdateBtn();
    settings.assertSuccessfulMessage(validation.success.updatingUserData);
    settings.clickOnOkeyBtn();
    settings.assertPasswordFieldEmpty();
    settings.assertPasswordUpdated(normalPassword, this.userData);
  });

  it(`should provide an ability to log out`, () => {
    settings.clickOnLogoutBtn();
    homePage.assertPageUrl(homePage.url);
    homePage.assertHeaderNotContainUsername();
  });

  it(`should not allow to update user data with the empty 'Username' field`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.emptyUsername);
  });

  it(`should not allow to update user data with the empty 'Email' field`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.emptyEmail);
  });

  it(`should show an error when updating email with email without [name] part`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.invalidEmail);
  });

  it(`should show an error when updating email with email without '@' symbol`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.invalidEmail);
  });

  it(`should show an error when updating email with email without [domain] part`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.invalidEmail);
  });

  it(`should show an error when updating email with email without dot (.)`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.invalidEmail);
  });

  it(`should show an error when updating email with email without [top-domain] part`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.invalidEmail);
  });

  it(`should allow to update the password with password that contains 8 characters`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertSuccessfulMessage(validation.success.updatingUserData);
  });

  it(`should not allow to update the password with password ` +
    `that contains less then 8 characters`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.invalidPassword);
  });

  it(`should not allow to update the password with password ` +
    `without numbers`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.invalidPassword);
  });

  it(`should not allow to update the password with password ` +
    `without capital letter`, () => {
    settings.fillFormAndSubmit(newUserData);
    settings.assertErrorMessage(validation.error.invalidPassword);
  });
});
