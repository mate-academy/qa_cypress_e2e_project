/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
  });

  describe('Settings Update Tests', () => {
    let user;

    beforeEach(() => {
      cy.task('generateUser').then((generateUser) => {
        user = generateUser;
        cy.register(user.email, user.username, user.password);
        signUpPage.visit();
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        signUpPage.typeUsername(username);
        signUpPage.typeEmail(email);
        signUpPage.typePassword(password);
        signUpPage.clickSignUpButton();
        signUpPage.clickSomeButton();
        settingsPage.visit();
      });
    });

    it('should provide an ability to update username', () => {
      settingsPage.clickUpdateUsername();
      settingsPage.typeNewValue(
        ':nth-child(1) > .form-control', 'new-username');
      settingsPage.clickUpdateSettingsButton();
    });

    it('should provide an ability to update bio', () => {
      settingsPage.clickUpdateBio();
      settingsPage.typeNewValue(
        ':nth-child(3) > .form-control', 'New bio content');
      settingsPage.clickUpdateSettingsButton();
    });

    it('should provide an ability to update email', () => {
      settingsPage.clickUpdateEmail();
      settingsPage.typeNewValue(
        ':nth-child(4) > .form-control', 'new-email@example.com');
      settingsPage.clickUpdateSettingsButton();
      cy.get('.swal-modal').should('exist');
    });

    it('should provide an ability to update password', () => {
      const newPassword = 'NewPass123';
      settingsPage.clickUpdatePassword();
      settingsPage.typeNewValue(
        ':nth-child(5) > .form-control', newPassword, (value) => {
          expect(value.length).to.be.at.least(8);
          expect(value).to.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/);
          settingsPage.clickUpdateSettingsButton();
          cy.get('.swal-modal').should('exist');
        });
    });

    it('should provide an ability to log out', () => {

    });
  });
});
