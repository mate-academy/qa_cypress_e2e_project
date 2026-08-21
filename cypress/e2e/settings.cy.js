/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    return cy.task('db:clear')
      .then(() => cy.task('generateUser'))
      .then((generatedUser) => {
        user = generatedUser;

        return cy.register(user.email, user.username, user.password);
      })
      .then(() => cy.login(user.email, user.password));
  });

  it('should provide an ability to update username', () => {
    const username = `updated-${user.username}`;

    settingsPage.visit();
    settingsPage.updateUsername(username);

    homePage.assertHeaderContainUsername(username);
  });

  it('should provide an ability to update bio', () => {
    const bio = 'QA engineer who enjoys reliable end-to-end tests.';

    settingsPage.visit();
    settingsPage.updateBio(bio);

    settingsPage.bioField.should('have.value', bio);
  });

  it('should provide an ability to update an email', () => {
    const email = `updated-${user.email}`;

    settingsPage.visit();
    settingsPage.updateEmail(email);

    settingsPage.emailField.should('have.value', email);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Updated9Password!';

    settingsPage.visit();
    settingsPage.updatePassword(newPassword);
    settingsPage.logout();
    signInPage.visit();
    signInPage.signIn(user.email, newPassword);

    homePage.assertHeaderContainUsername(user.username);
  });
});
