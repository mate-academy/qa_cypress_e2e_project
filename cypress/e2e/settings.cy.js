
import SettingsPageObject from '../support/pages/settings.pageObject';
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  beforeEach(() => {

    cy.task('db:clear'); // clear the database before each test
  });
  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.updateUsername('NewUsername');

    cy.contains('NewUsername').should('be.visible'); // Verify the username is updated
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.updateBio('This is my updated bio');

    cy.contains('This is my updated bio').should('be.visible'); // Verify the bio is updated
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.updateEmail('newemail@example.com');

    cy.contains('Your email has been updated').should('be.visible'); // Verify the email is updated
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.updatePassword('NewSecurePassword123!');

    cy.contains('Your password has been updated').should('be.visible'); // Verify the password is updated
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOut();

    cy.contains('Sign In').should('be.visible'); // Verify the user is logged out
  });
});
