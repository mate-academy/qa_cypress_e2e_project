/// <reference types='cypress' />
/// <reference types='../support' />

import settingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new settingsPageObject();
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
    cy.task('generateUser').then((generateUser) => {
      editUser = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.typeUsername(editUser.username);
    settingsPage.clickOnUpdateButton();

    settingsPage.checkSuccessMessage();
    settingsPage.checkHeaderContainUsername(editUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.typeBio(editUser.username + user.username);
    settingsPage.clickOnUpdateButton();

    settingsPage.checkSuccessMessage();
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.typeEmail(editUser.email);
    settingsPage.clickOnUpdateButton();

    settingsPage.checkSuccessMessage();
    settingsPage.clickOnOkButton();
    signInPage.visit();
    signInPage.typeEmail(editUser.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.typePassword(editUser.password);
    settingsPage.clickOnUpdateButton();

    settingsPage.checkSuccessMessage();
    settingsPage.clickOnOkButton();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(editUser.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.clickOnLogOutButton();
    settingsPage.checkHeader();
  });
});
