/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let userEmail;
  let userName;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      userEmail = generateUser.email;
      userName = generateUser.username;

      cy.register(generateUser.email,
        generateUser.username, generateUser.password);

      signInPage.visit();

      signInPage.typeEmail(generateUser.email);
      signInPage.typePassword(generateUser.password);

      signInPage.clickSignInBtn();

      cy.wait(2000);
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();

    settingsPage.typeUsername('changed_test');

    settingsPage.updateBtn.click();

    settingsPage.alertMessage.should('contain.text', 'Update successful!');
    settingsPage.okBtn.click();

    cy.wait(1000);

    settingsPage.username.should('contain.value', 'changed_test');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();

    settingsPage.typeBio('changed bio of a user');

    settingsPage.updateBtn.click();

    settingsPage.alertMessage.should('contain.text', 'Update successful!');
    settingsPage.okBtn.click();

    cy.wait(1000);

    settingsPage.bio.should('contain.value', 'changed bio of a user');
  });

  it.skip('should provide an ability to update an email', () => {
    settingsPage.visit();

    settingsPage.typeEmail('test144@mail.com');

    settingsPage.updateBtn.click();

    settingsPage.alertMessage.should('contain.text', 'Update successful!');
    settingsPage.okBtn.click();

    cy.wait(1000);

    settingsPage.email.should('contain.value', 'test144@mail.com');
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();

    settingsPage.typePassword('P@$$w0rd_test');

    settingsPage.updateBtn.click();

    settingsPage.alertMessage.should('contain.text', 'Update successful!');
    settingsPage.okBtn.click();

    signInPage.visit();

    signInPage.typePassword('P@$$w0rd_test');
    signInPage.typeEmail(userEmail);

    signInPage.clickSignInBtn();

    cy.getByDataCy('username-link')
      .should('exist').and('contain.text', userName);
  });

  it.only('should provide an ability to log out', () => {
    settingsPage.visit();

    settingsPage.logout();

    settingsPage.checkLogout();
  });
});
