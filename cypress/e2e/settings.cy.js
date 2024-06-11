/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let changeUser;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      return cy.task('generateUser2').then((generateUser2) => {
        changeUser = generateUser2;
      });
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
  });

  it('should provide an ability to update username', () => {
    homePage.visit('/#/settings');
    settingsPage.fillUsernameField(changeUser.username);
    settingsPage.clickUpdateButton();

    homePage.assertHeaderContainUsername(changeUser.username);
  });

  it('should provide an ability to update bio', () => {
    homePage.visit('/#/settings');
    settingsPage.fillBioField(user.bio);
    settingsPage.clickUpdateButton();
    settingsPage.clickOkButton();
    homePage.visit(`/#/@${user.username}/`);
    profilePage.assertProfileContainBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    homePage.visit('/#/settings');
    settingsPage.fillEmailField(changeUser.email);
    settingsPage.clickUpdateButton();
    settingsPage.clickOkButton();
    settingsPage.assertTheEmailField(changeUser.email);
  });

  it('should provide an ability to update password', () => {
    homePage.visit('/#/settings');
    settingsPage.fillPasswordField(changeUser.password);
    settingsPage.clickUpdateButton();
    settingsPage.clickOkButton();

    settingsPage.clickLogoutButton();
    cy.loginAuth(user.email, changeUser.password);
    homePage.visit('/#/settings');
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    homePage.visit('/#/settings');
    settingsPage.clickLogoutButton();

    cy.getCookie('auth').should('not.exist');
  });
});
