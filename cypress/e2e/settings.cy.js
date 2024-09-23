import SettingsPageObject from '../support/pages/settingsPage.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

/// <reference types='cypress' />
/// <reference types='../support' />

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    const updateSuccessfulMessage = 'Update successful!';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');

    settingsPage.usernameField.should('be.visible');
    settingsPage.usernameField.clear();
    settingsPage.usernameField.type(user.updateUsername);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-modal').should('contain', updateSuccessfulMessage);
    cy.get('.swal-button').click();

    homePage.usernameLink.should('contain', user.updateUsername);
  });

  it('should provide an ability to update bio', () => {
    const updateSuccessfulMessage = 'Update successful!';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');

    settingsPage.bioField.should('be.visible');
    settingsPage.bioField.type(user.bio);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-modal').should('contain', updateSuccessfulMessage);
    cy.get('.swal-button').click();
    homePage.usernameLink.click();
    cy.getByDataQa('user-profile-image').should('contain', user.bio);
  });

  it('should provide an ability to update an email', () => {
    const updateSuccessfulMessage = 'Update successful!';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');

    settingsPage.emailField.should('be.visible');
    settingsPage.emailField.clear();
    settingsPage.emailField.type(user.updateEmail);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-modal').should('contain', updateSuccessfulMessage);
    cy.get('.swal-button').click();

    settingsPage.emailField.should('contain', user.updateEmail);
  });

  it('should provide an ability to update password', () => {
    const updateSuccessfulMessage = 'Update successful!';
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');

    settingsPage.passwordField.should('be.visible');
    settingsPage.passwordField.type(user.updatePassword);
    settingsPage.clickUpdateBtn();

    cy.get('.swal-modal').should('contain', updateSuccessfulMessage);
    cy.get('.swal-button').click();
    cy.reload().clearCookies();
    cy.visit('/#/login');

    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(user.updatePassword);
    signInPage.clickSignInBtn();

    homePage.usernameLink.should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/settings');

    settingsPage.logoutBtn.should('be.visible');
    settingsPage.clickLogoutBtn();

    cy.url().should('be.equal', 'http://localhost:1667/#/');

    homePage.signInLink.should('exist');
    cy.getCookie('drash_sess')
      .should('have.property', 'value', 'null');
  });
});
