/// <reference types='cypress' />
/// <reference types='../support' />
import { SettingsPageObject } from '../support/pages/settings.pageObject';
import { SignInPageObject } from '../support/pages/signIn.pageObject';
import { HomePageObject } from '../support/pages/home.pageObject';

describe('Settings page', () => {
  const settingsPage = new SettingsPageObject();
  const signInPage = new SignInPageObject();
  const homePage = new HomePageObject();
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.userNameField.clear().type(user.newUserName);

    settingsPage.updateSettingsButton.click();
    settingsPage.assertModalIsVisible();
    settingsPage.clickOKButton();

    homePage.assertHeaderContainUsername(user.newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField.type(user.newBio);

    settingsPage.updateSettingsButton.click();
    settingsPage.assertModalIsVisible();
    settingsPage.clickOKButton();

    settingsPage.userBioTextUpdated(user.newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.clear().type(user.newEmail);

    settingsPage.updateSettingsButton.click();
    settingsPage.assertModalIsVisible();
    settingsPage.clickOKButton();

    cy.clearAllCookies().reload();
    signInPage.visit();

    signInPage.typeEmail(user.newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    settingsPage.assertAlertErrorMessage();
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField.type(user.newPassword);

    settingsPage.updateSettingsButton.click();
    settingsPage.assertModalIsVisible();
    settingsPage.clickOKButton();

    cy.clearAllCookies().reload();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutButton.click();
    cy.getCookie('drash_sess').should('have.property', 'value', 'null');
  });
});
