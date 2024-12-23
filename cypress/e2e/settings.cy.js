/// <reference types='cypress' />
/// <reference types='../support' />
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {

    cy.task('db:clear');
    cy.visit('/');
    cy.register();
    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.typePassword('12345Qwert!');
    signInPage.clickSignInBtn();
    settingsPage.clickProfileLink();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user.username);
    settingsPage.submitForm();
    settingsPage.assertProfilePage(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.submitForm();
    settingsPage.assertProfilePage(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.submitForm();
    settingsPage.assertProfilePage(user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.password);
    settingsPage.submitForm();
    settingsPage.assertProfilePage();
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();
    cy.url().should('include', '/');
  });
});
