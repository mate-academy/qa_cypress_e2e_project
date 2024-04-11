/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject;
const homePage = new HomePageObject;
const profilePage = new ProfilePageObject;
const signInPage = new SignInPageObject;

describe('Settings page', () => {
let user;
const defaultPassword = '12345Qwert';
const defaultUsername = 'riot';
const defaultEmail = 'riot@qa.team';
  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.visit('/#/settings');
  });

  it('should provide an ability to update username', () => {
    // update user's username
    settingsPage.typeUsername(user.username);
    settingsPage.clickOnUpdateButton;
    settingsPage.confirmDialogWindow;

    // assert the username is changed
    homePage.assertHeaderContainUsername(user.username);
    
  });

  it('should provide an ability to update bio', () => {
    // update user's bio
    settingsPage.typeBio(user.bio);
    settingsPage.clickOnUpdateButton;
    settingsPage.confirmDialogWindow;
    homePage.clickOnUsernameLink;

    // assert the bio is changed
    profilePage.checkProfileBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    // this test finds a bug, the email is not updated
  
    // update user's email
    settingsPage.typeEmail(user.email);
    settingsPage.clickOnUpdateButton;
    settingsPage.confirmDialogWindow;

    // assert the user is able to login with the updated email
    settingsPage.clickOnLogoutButton;
    cy.visit('/#/login');
    signInPage.typeEmail(user.email);
    signInPage.typePassword(defaultPassword);
    signInPage.clickSignInBtn;
    homePage.assertHeaderContainUsername(defaultUsername);
  });

  it('should provide an ability to update password', () => {
    // update user's password
    settingsPage.typePassword(user.randomPassword);
    settingsPage.clickOnUpdateButton;
    settingsPage.confirmDialogWindow;

    // assert the user is able to login with the changed password
    settingsPage.clickOnLogoutButton;
    cy.visit('/#/login');
    signInPage.typeEmail(defaultEmail);
    signInPage.typePassword(user.randomPassword);
    signInPage.clickSignInBtn;
    homePage.assertHeaderContainUsername(defaultUsername);
  });

  it('should provide an ability to log out', () => {
    // logout
    settingsPage.clickOnLogoutButton;

    // assert the header doesn't contain the username link
    homePage.header.should('not.contain.text', defaultUsername);
  });
});
