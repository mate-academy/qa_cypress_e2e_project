/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject.js';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  const successfulUpdateMessage = 'Update successful!';

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    // почекати щоб очистилась база
    // cy.wait(2000);
    //  черрез API
    cy.register(user.email, user.username, user.password);
    // login автоматичний
    // cy.loginAuth(user.email, user.password);
    settingsPage.visit('');
  });

  it('should have a correct title', () => {
    cy.get('h1').should('contain.text', 'Your Settings');
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserName(user.updatedUsername);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-modal').should('contain', successfulUpdateMessage);
    settingsPage.clickOkButton();

    homePage.assertHeaderContainUsername(user.updatedUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-modal').should('contain', successfulUpdateMessage);
    settingsPage.clickOkButton();

    settingsPage.assertUpdatedBioField(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.updatedEmail);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-modal').should('contain', successfulUpdateMessage);
    settingsPage.clickOkButton();

    //  here is a bug
    settingsPage.assertUpdatedEmailField(user.updatedEmail);
  });

  it.only('should provide an ability to update password', () => {
    settingsPage.typePassword(user.updatedPassword);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-modal').should('contain', successfulUpdateMessage);
    settingsPage.clickOkButton();

    settingsPage.clickLogoutBtn();

    cy.loginAuth(user.email, user.updatedPassword);

    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit('');
    settingsPage.clickLogoutBtn();
    settingsPage.assertHeaderNotContainUsername(user.username);
    cy.getCookie('auth').should('not.exist');

    homePage.assertHeaderContainSignInLink('Sign in');
  });
});