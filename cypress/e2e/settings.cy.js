/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPageObject from '../support/pages/settings.PageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
describe('Settings page', () => {
  let newData;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateNewData').then(generateNewData => {
      newData = generateNewData;
    });
    cy.register();
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.usernameField.type(`{selectAll}${newData.username}`);
    settingsPage.updateSettingsBtn.click();
    settingsPage.assertMessageAboutUpdatingData();
    homePage.usernameLink.should('contain', newData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.bioField.type(`{selectAll}${newData.bio}`);
    settingsPage.updateSettingsBtn.click();
    settingsPage.assertMessageAboutUpdatingData();
    homePage.usernameLink.click();
    settingsPage.assertMessageAboutUpdatingBio(newData.bio);
  });

  it('should provide an ability to update an email', () => {
    //settingsPage.visit();
    //settingsPage.emailField.type(`{selectAll}${newData.email}`);
    //settingsPage.updateSettingsBtn.click();
    //settingsPage.assertMessageAboutUpdatingData();
    //settingsPage.emailField.should('to.have.value', newData.email);
  });

  it('should provide an ability to update password', () => {
    //settingsPage.visit();
    //settingsPage.passwordField.type(`{selectAll}${newData.password}`);
    //settingsPage.updateSettingsBtn.click();
    //settingsPage.assertMessageAboutUpdatingData();
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.logoutBtn.click();
    settingsPage.assertSuccessfulLogout();
  });
});
