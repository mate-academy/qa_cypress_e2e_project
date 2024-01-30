/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settingsPageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

let user;
let secondUser;

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateSecondUser').then((generateSecondUser) => {
      secondUser = generateSecondUser;
    });
  });

  it.skip('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.settingsLinkClick();
    settingsPage.typeUsername(secondUser.username);
    settingsPage.updateButtonClick();
    settingsPage.assertPopUp();
    settingsPage.popUpOkButtonClick();
    homePage.assertHeaderContainUsername(secondUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.settingsLinkClick();
    settingsPage.typeBio(user.updatedBio);
    settingsPage.updateButtonClick();
    settingsPage.assertPopUp();
    settingsPage.popUpOkButtonClick();

    settingsPage.assertBioContainUpdatedBio(user.updatedBio);
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.settingsLinkClick();
    settingsPage.typeEmail(user.updatedEmail);
    settingsPage.updateButtonClick();
    settingsPage.popUpOkButtonClick();

    settingsPage.assertEmailContainUpdatedEmail(user.updatedEmail);
    // як потрібно перевірити відповідь від сервера через сайпрес
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.settingsLinkClick();
    settingsPage.typePassword(user.updatedPassword);
    settingsPage.updateButtonClick();
    settingsPage.assertPopUp();
    settingsPage.popUpOkButtonClick();

    settingsPage.logoutButtonClick();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.updatedPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername();
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.settingsLinkClick();

    settingsPage.logoutButtonClick();

    homePage.assertHomeUrl();
  });
});
