/// <reference types='cypress' />
/// <reference types='../support' />
import SettingsPageObject from '../support/pages/settings.pageObject';
import { generateUser } from '../support/generateData';
import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const homePage = new HomePageObject();
const userPage = new UserPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let newData;
  const successfulUpdateMessage = 'Update successful!';

  beforeEach(() => {
    cy.task('db:clear');
    user = generateUser();
    newData = generateUser();
    cy.register(user.email, user.username, user.password);
    cy.visit(settingsPage.url);
  });

  // `{selectAll}{backspace}${newArticleData.title}`

  it('should provide an ability to update username', () => {
    settingsPage.typeNewUsername(`{selectAll}{backspace}${newData.username}`);
    settingsPage.updateSettingsBtn();

    cy.get('.swal-modal').should('contain', successfulUpdateMessage);
    cy.get('.swal-button').click();
    homePage.assertHeaderContainUsername(newData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeNewBio(`{selectAll}{backspace}${newData.bio}`);
    settingsPage.updateSettingsBtn();

    cy.get('.swal-modal').should('contain', successfulUpdateMessage);
    cy.get('.swal-button').click();
    homePage.usernameLink.click();
    userPage.userBio.should('contain', newData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeNewEmail(`{selectAll}{backspace}${newData.email}`);
    settingsPage.updateSettingsBtn();

    cy.get('.swal-modal').should('contain', successfulUpdateMessage);
    cy.get('.swal-button').click();

    //  here is a bug

    settingsPage.assertEmailIsChanged(newData.email);
  });

  it.only('should provide an ability to update password', () => {
    settingsPage.typeNewPassword(newData.password);
    settingsPage.updateSettingsBtn();

    cy.get('.swal-modal').should('contain', successfulUpdateMessage);
    cy.get('.swal-button').click();

    settingsPage.logoutBtn();
    cy.login(user.email, newData.password);
    settingsPage.visit();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn();
    homePage.assertHeaderContainSignInLink('Sign in');
  });
});
