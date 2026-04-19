/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject
  from '../support/pages/settings.pageObject';
import HomePageObject
  from '../support/pages/home.pageObject';
import SignInPageObject
  from '../support/pages/signIn.pageObject';
import ProfilePageObject
  from '../support/pages/profile.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      return cy.register(
        user.email, user.username, user.password
      );
    }).then((registeredUser) => {
      user = registeredUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.task('generateUser').then((newData) => {
      settingsPage.visit();

      settingsPage.typeUsername(newData.username);
      settingsPage.clickUpdateSettingsBtnAndWait();

      settingsPage.assertModalTitle(
        'Update successful'
      );
      settingsPage.closeModal();

      homePage.assertHeaderContainUsername(
        newData.username
      );
    });
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'A new bio for testing purposes';
    settingsPage.visit();

    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateSettingsBtnAndWait();

    settingsPage.assertModalTitle(
      'Update successful'
    );
    settingsPage.closeModal();

    profilePage.visit(user.username);
    profilePage.assertBioContains(newBio);
  });

  it('should provide an ability to update email', () => {
    cy.task('generateUser').then((newData) => {
      settingsPage.visit();

      settingsPage.typeEmail(newData.email);
      settingsPage.typePassword(user.password);
      settingsPage.clickUpdateSettingsBtnAndWait();

      settingsPage.assertModalTitle(
        'Update successful'
      );
      settingsPage.closeModal();

      homePage.assertHeaderContainUsername(
        user.username
      );
    });
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'NewPass123!';
    settingsPage.visit();

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettingsBtnAndWait();

    settingsPage.assertModalTitle(
      'Update successful'
    );
    settingsPage.closeModal();

    settingsPage.clickLogoutBtn();
    cy.url().should('include', '/#/');

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    cy.url().should('include', '/#/');
    cy.getByDataQa('username-link').should('not.exist');
  });
});
