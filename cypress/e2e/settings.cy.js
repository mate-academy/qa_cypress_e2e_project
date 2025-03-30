/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsUserPageObject from '../support/pages/settingsUser.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsUser = new SettingsUserPageObject();

let user;

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  const signInAndVisitSettings = () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  };

  it('should provide an ability to update username', () => {
    signInAndVisitSettings();
    settingsUser.editUsername();
    settingsUser.assertSuccesfulEdit();
    homePage.homePageRedirect();
    homePage.assertHeaderContainUpdateUsername();
  });

  it('should provide an ability to update bio', () => {
    signInAndVisitSettings();
    settingsUser.editBio();
    settingsUser.assertSuccesfulEdit();
    homePage.homePageRedirect();
    homePage.profileRedirect();
    settingsUser.assertBioUser();
  });

  it.only('should provide an ability to update an email', () => {
    signInAndVisitSettings();
    settingsUser.editEmail();
    settingsUser.assertSuccesfulEdit();
  });

  it('should provide an ability to update password', () => {
    signInAndVisitSettings();
    settingsUser.editPassword();
    settingsUser.assertSuccesfulEdit();
  });

  it('should provide an ability to log out', () => {
    signInAndVisitSettings();
    settingsUser.logoutUser();
    settingsUser.assertUserIsLogedout();
  });
});
