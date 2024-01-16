/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let update;

  before(() => {
    cy.visit('/');
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('updateUser').then((updateUser) => {
      update = updateUser;
    });
  });

  it('should provide an ability to update bio', () => {
    signInPage.visit();
    signInPage.emailField.should('exist');
    signInPage.passwordField.should('exist');
    signInPage.signInBtn.should('exist');
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    cy.getByDataCy('profile-link').should('contain', user.username);
    settingsPage.visit();
    settingsPage.bioTextarea.should('exist');
    settingsPage.updateSettingsBtn.should('exist');
    settingsPage.typeBio(update.bio);
    settingsPage.clickUpdateBtn();
    cy.url().should('contain', `profile/${user.username}`);
    cy.getByDataCy('bio').should('contain', `${update.bio}`);
  });
});
