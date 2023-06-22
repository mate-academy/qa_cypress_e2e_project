/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from "../support/pages/home.pageObject";
import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import UserPageObject from "../support/pages/user.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const userPage = new UserPageObject();
const signInPage = new SignInPageObject();
let user;

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.register();
  });

  beforeEach(() => {
    settingsPage.visit();
    settingsPage.typeUsername(user.username);
    settingsPage.clickOnUpdate();
    settingsPage.allertWindow.should('contain', 'Update successful!');
    homePage.usernameLink.should('contain', user.username);
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeUsername(user.username);
    settingsPage.clickOnUpdate();
    settingsPage.allertWindow.should('contain', 'Update successful!');
    homePage.usernameLink.should('contain', user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeBio(user.bio);
    settingsPage.clickOnUpdate();
    settingsPage.allertWindow.should('contain', 'Update successful!');
    settingsPage.closeModalWindow();
    homePage.usernameLink.click();
    userPage.userBio.should('contain', user.bio)
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeEmail(user.email);
    settingsPage.clickOnUpdate();
    settingsPage.allertWindow.should('contain', 'Update successful!');
    settingsPage.closeModalWindow();
    settingsPage.emailField.should('have.value', user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typePassword(user.password);
    settingsPage.clickOnUpdate();
    settingsPage.allertWindow.should('contain', 'Update successful!');
    settingsPage.closeModalWindow();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogOut();
    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.typePassword(user.password);
    signInPage.clickOnSignIn();
    homePage.usernameLink.should('contain', 'riot');
  });
});
