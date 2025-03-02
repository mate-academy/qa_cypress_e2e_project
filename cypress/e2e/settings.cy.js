import SettingsPageObject from '../support/pages/settings.pageObject';

const SettingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.login(user);
      SettingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    SettingsPage.updateUserName();
  });

  it('should provide an ability to update bio', () => {
    SettingsPage.updateBio();
  });

  it('should provide an ability to update an email', () => {
    SettingsPage.updateEmail();
  });

  it('should provide an ability to update password', () => {
    SettingsPage.updatePassword();
  });

  it('should provide an ability to log out', () => {
    SettingsPage.logout();
    cy.contains('Sign in').should('be.visible');
  });
});
