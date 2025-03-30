/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

const newUsername = faker.lorem.word();
const newBio = faker.lorem.sentence();
const newEmail = faker.internet.email().toLowerCase();
const newPassword = faker.internet.password();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.viewport(1980,1024);
    cy.task('db:clear');
  });

  beforeEach(() => {  
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(generateUser.email, generateUser.username, generateUser.password);
    });

    settingsPage.visit(); 
  });

  it('should provide an ability to update username', () => { 
    settingsPage.clearUsername();
    settingsPage.updateUsername(newUsername);
    settingsPage.clickUpdateBtn();
    homePage.visit();

    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clearBio();
    settingsPage.updateBio(newBio);
    settingsPage.clickUpdateBtn();
    homePage.visit();
    homePage.clickSettings();

    settingsPage.assertBioUpdate(newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmail();
    settingsPage.updateEmail(newEmail);
    settingsPage.clickUpdateBtn();
    homePage.visit();
    homePage.clickSettings();
    
    settingsPage.assertEmailUpdate(newEmail);   
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username); 
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

     homePage.assertHeaderNotContainUsername();
  });
});
