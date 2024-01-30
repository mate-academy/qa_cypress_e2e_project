/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearUserName();
    settingsPage.typeUserName('new' + user.username);
    settingsPage.typePassword(user.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.validateSuccessPopup();
    settingsPage.clickmodalOkBtn();
    settingsPage.visit();
    settingsPage.validateUsernameSaved('new' + user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clearBio();
    settingsPage.typeBio('new' + user.bio);
    settingsPage.typePassword(user.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.validateSuccessPopup();
    settingsPage.clickmodalOkBtn();
    settingsPage.visit();
    settingsPage.validateBioSaved('new' + user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearUseremail();
    settingsPage.typeUseremail('new' + user.email);
    settingsPage.typePassword(user.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.validateSuccessPopup();
    settingsPage.clickmodalOkBtn();
    settingsPage.visit();
    settingsPage.validateEmailSaved('new' + user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword('new' + user.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.validateSuccessPopup();
    settingsPage.clickmodalOkBtn();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword('new' + user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.assertHomepage();
  });
});
