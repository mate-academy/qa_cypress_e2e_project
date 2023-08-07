/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;
  let editUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateUser').then((generateEditUser) => {
      editUser = generateEditUser;
    });
  });

  it('should provide an ability to update username', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.signIn(user.email, user.password);

    cy.wait(4000);

    settingsPage.visit();

    settingsPage.typeUserName(editUser.username);
    settingsPage.clickBtn('Update Settings');

    settingsPage.assertUpdateSuccessful();
    settingsPage.clickSwalBtn('OK');

    settingsPage.assertUserNameValue(editUser.username);
  });

  it('should provide an ability to update bio', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.signIn(user.email, user.password);

    cy.wait(4000);

    settingsPage.visit();

    settingsPage.typeBio(editUser.bio);
    settingsPage.clickBtn('Update Settings');

    settingsPage.assertUpdateSuccessful();
    settingsPage.clickSwalBtn('OK');

    settingsPage.assertUserBioValue(editUser.bio);
  });

  it('should provide an ability to update an email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.signIn(user.email, user.password);

    cy.wait(4000);

    settingsPage.visit();

    settingsPage.typeEmail(editUser.email);
    settingsPage.clickBtn('Update Settings');

    settingsPage.assertUpdateSuccessful();
    settingsPage.clickSwalBtn('OK');
  });

  it('should provide an ability to update password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.signIn(user.email, user.password);

    cy.wait(4000);

    settingsPage.visit();

    settingsPage.typePassword(editUser.password);
    settingsPage.clickBtn('Update Settings');

    settingsPage.assertUpdateSuccessful();
    settingsPage.clickSwalBtn('OK');
  });

  it('should provide an ability to log out', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.signIn(user.email, user.password);

    cy.wait(4000);

    settingsPage.visit();

    settingsPage.clickBtn('Or click here to logout.');

    homePage.assertUserHeaderNotExist();
  });
});
