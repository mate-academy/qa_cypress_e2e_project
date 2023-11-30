/// <reference types='cypress' />
/// <reference types='../support' />

import faker from 'faker';
import SettingsPageObjet from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObjet;
const homePage = new HomePageObject;

describe('Settings page', () => {
 let user; 
  
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    })
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();

    settingsPage.visit();
    settingsPage.fillUsernameField('{selectAll}' + newUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.successfulMessage();
    settingsPage.clickOkBtn();
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();

    settingsPage.visit();
    settingsPage.fillBioField(newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.successfulMessage();
    settingsPage.clickOkBtn();
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingsPage.visit();
    settingsPage.fillEmailField('{selectAll}' + newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.successfulMessage();
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password(8);

    settingsPage.visit();
    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.successfulMessage();
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    homePage.assertHomeLink();
    homePage.assertSignUpLink();
    homePage.assertSigninLink();
  });
});
