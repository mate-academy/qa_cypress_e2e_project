/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import { settingsPage } from '../support/pages/settings.pageObject';

const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('Settings page', () => {
  let user;
  let changedUser;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      return cy.task('generateAnotherUser').then((secondUSer) => {
        changedUser = secondUSer;
      });
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(2000);
    cy.register(user.email, user.username, user.password)
  });

  it('should provide an ability to update username', () => {
    homePage.visit('/#/settings');
    settingsPage.fillUsernameField(changedUser.username);
    settingsPage.clickUpdateButton();

    homePage.assertHeaderContainUsername(changedUser.username);
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
    settingsPage.fillEmailField(changedUser.email);
    settingsPage.clickUpdateButton();
    settingsPage.clickOkButton();
    settingsPage.assertTheEmailField(changedUser.email); // 1 way to check! BUG

    settingsPage.clickLogoutButton(); // this is bug, the user isn't able to change
    cy.loginAuth(changedUser.email, user.password);
    homePage.visit('/#/settings');
    settingsPage.assertTheEmailField(changedUser.email);
  });

  it('should provide an ability to update password', () => {
    homePage.visit('/#/settings');
    settingsPage.fillPasswordField(changedUser.password);
    settingsPage.clickUpdateButton();
    settingsPage.clickOkButton();

    // assert that the password is changed;
    settingsPage.clickLogoutButton();
    cy.loginAuth(user.email, changedUser.password);
    homePage.visit('/#/settings');
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    homePage.visit('/#/settings');
    settingsPage.clickLogoutButton();

    cy.getCookie('auth').should('not.exist');
  });
});
