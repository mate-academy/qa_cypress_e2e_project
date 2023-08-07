/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const userPage = new UserPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let editedUser;

  const alertMessage = {
    successUpdate: 'Update successful!'
  };

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser2').then((generateUser2) => {
      editedUser = generateUser2;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.clearUsername();
    settingsPage.typeUsername(editedUser.username);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertWindowUpdatingSettings(alertMessage.successUpdate);
    settingsPage.clickOnOkBtnOnSettingsModal();

    cy.reload();

    settingsPage.assertUpdatingUsername(editedUser.username);
    homePage.assertHeaderContainUsername(editedUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.typeBio(editedUser.bio);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertWindowUpdatingSettings(alertMessage.successUpdate);
    settingsPage.clickOnOkBtnOnSettingsModal();

    cy.reload();

    settingsPage.assertUpdatingBio(editedUser.bio);

    userPage.visitUserPage(user.username);
    userPage.assertUpdatingBio(editedUser.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.clearEmail();
    settingsPage.typeEmail(editedUser.email);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertWindowUpdatingSettings(alertMessage.successUpdate);
    settingsPage.clickOnOkBtnOnSettingsModal();

    cy.reload();

    settingsPage.assertUpdatingEmail(editedUser.email);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.typePassword(editedUser.password);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertWindowUpdatingSettings(alertMessage.successUpdate);
    settingsPage.clickOnOkBtnOnSettingsModal();

    settingsPage.clickLogoutBtn();

    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(editedUser.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.clickLogoutBtn();

    homePage.assertHeaderContainSignUp();
    homePage.assertHeaderContainSignIn();
    cy.url().should('include', '/#/');
    cy.url().should('not.include', '/settings');
  });
});
