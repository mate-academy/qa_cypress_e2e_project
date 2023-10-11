/// <reference types='cypress' />
/// <reference types='../support' />
import faker from 'faker';

import HomePageObject from '../support/pages/home.pageObject';
import ModalObject from '../support/pages/modal.Object';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const modal = new ModalObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
      signInPage.visit();
      signInPage.login(user.email, user.password);
      homePage.clickSettingsLink();
    });
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.login(user.email, user.password);
    homePage.clickSettingsLink();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearUsername();
    const randomNumber = Math.ceil(Math.random(1000) * 1000);
    const newUserName = faker.name.firstName() + `${randomNumber}`;
    settingsPage.typeUsername(newUserName);
    settingsPage.clickSubmit();
    user.username = newUserName;
    modal.assertPageContainsUpdateSuccessMessage();
    modal.clickOkButton();
    settingsPage.assertUsername(newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clearBio();
    const newBio = faker.lorem.words();
    settingsPage.typeBio(newBio);
    settingsPage.clickSubmit();
    user.bio = newBio;
    modal.assertPageContainsUpdateSuccessMessage();
    modal.clickOkButton();
    settingsPage.assertBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmail();
    const randomNumber = Math.ceil(Math.random(1000) * 1000);
    const newEmail = 'test' + `${randomNumber}` + '@mail.com';
    settingsPage.typeEmail(newEmail);
    settingsPage.clickSubmit();
    // user.email = newEmail;
    modal.assertPageContainsUpdateSuccessMessage();
    modal.clickOkButton();
    // settingsPage.assertEmail(newEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.clearPassword();
    const newPassword = 'Qwert!12345';
    settingsPage.typePassword(newPassword);
    user.password = newPassword;
    settingsPage.clickSubmit();
    modal.assertPageContainsUpdateSuccessMessage();
    modal.clickOkButton();
    settingsPage.logout();
    signInPage.visit();
    signInPage.login(user.email, user.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();
    homePage.assertHeaderDoesNotContainUsername(user.username);
  });
});
