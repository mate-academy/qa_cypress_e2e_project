/// <reference types='cypress' />
/// <reference types='../support' />

import faker from 'faker';
import SettingsPageObject from '../support/pages/Settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/Profile.pageObject';


const profilePage = new ProfilePageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();


describe('Settings page', () => {
  let user;

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.wait(2000)
    cy.register()
    cy.login()
    settingsPage.visit();
  });


  it('should provide an ability to update username', () => {
    cy.get('[data-cy="username"]').clear();
    settingsPage.typeUsername(user.username);
    settingsPage.clickupdateBtn();
    settingsPage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    let bioUpdate = faker.random.words(10);
    cy.get('[data-cy="bio"]').clear();
    settingsPage.typeBio(bioUpdate);
    settingsPage.clickupdateBtn();
    settingsPage.assertAlertContainMessage();
    cy.get('.swal-button').click()
    cy.get('[data-cy="username-link"]').click()
    profilePage.assertProfileBio(bioUpdate)
  });

  it('should provide an ability to update an email', () => {
    cy.get('[data-cy="userEmail"]').clear();
    settingsPage.typeEmail(user.emailUpdate);
    settingsPage.clickupdateBtn();
    settingsPage.assertAlertContainMessage();
    cy.get('.swal-button').click();
    settingsPage.clickbtnLogOut();
    cy.login(user.emailUpdate, user.password)
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.get('[data-cy="userPassword"]').clear();
    settingsPage.typePassword(user.newPassword);
    settingsPage.clickupdateBtn();
    settingsPage.assertAlertContainMessage();
    cy.get('.swal-button').click()
    settingsPage.clickbtnLogOut();
    cy.login(user.email, user.newPassword)
  homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickbtnLogOut();
    homePage.usernameLink.should('not.exist');
  });
});
