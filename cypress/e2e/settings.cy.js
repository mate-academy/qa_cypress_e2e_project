/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
describe('Settings page', () => {
  let user;
  let uppdateSettings;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateSettings').then((generateSettings) => {
      uppdateSettings = generateSettings;
    });
  });

  it('should provide an ability to update username', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.assertHeaderContainUsername(user.username);
    settingsPage.visit();

    settingsPage.typeUsernameSettings(uppdateSettings.usernameSettings);
    settingsPage.ClickUppdateSettings();
    settingsPage.visit();
  });

  it('should provide an ability to update bio', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.assertHeaderContainUsername(user.username);

    settingsPage.visit();
    settingsPage.typeBioSettings(uppdateSettings.bioSettings);
    settingsPage.ClickUppdateSettings();
    settingsPage.visit();
  });

  it('should provide an ability to update an email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.assertHeaderContainUsername(user.username);

    settingsPage.visit();
    settingsPage.typeEmailSettings(uppdateSettings.emailSettings);
    settingsPage.ClickUppdateSettings();
    settingsPage.visit();
  });

  it('should provide an ability to update password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.assertHeaderContainUsername(user.username);

    settingsPage.visit();
    settingsPage.typePasswordSettings(uppdateSettings.passwordSettings);
    settingsPage.ClickUppdateSettings();
    settingsPage.visit();
  });

  it('should provide an ability to log out', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.assertHeaderContainUsername(user.username);

    settingsPage.visit();
    settingsPage.ClickLogout();
  });
});
