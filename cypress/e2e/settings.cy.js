/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateData').as('userData');

    signInPage.visit();
    cy.task('generateUser').then((generateUser) => {
      const { email, username, password } = generateUser;
      cy.registerAndLoginUser(
        email, username, password
      );
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    cy.get('@userData').then(({ name }) => {
      settingsPage.typeName(name);
      settingsPage.verifyUserName(name);
    });
  });

  it('should provide an ability to update bio', () => {
    cy.get('@userData').then(({ bio }) => {
      settingsPage.typeBio(bio);
      settingsPage.verifyBio(bio);
    });
  });

  it('should provide an ability to update an email', () => {
    cy.get('@userData').then(({ email }) => {
      settingsPage.typeEmail(email);
      settingsPage.verifyEmail(email);
    });
  });

  it('should provide an ability to update password', () => {
    cy.get('@userData').then(({ password }) => {
      settingsPage.typePassword(password);
      settingsPage.verifyPassword(password);
      settingsPage.clickUpdateBtn();
    });
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    settingsPage.verifySignInLink();
  });
});
