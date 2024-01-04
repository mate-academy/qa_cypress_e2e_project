import SettingsPageObject from '../support/pages/settings.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
const faker = require('faker');
/// <reference types='cypress' />
/// <reference types='../support' />

const settingsPage = new SettingsPageObject();
const userPage = new UserPageObject();

describe('Settings page', () => {
  let user;
  before(() => {

  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const randomUsername = faker.name.firstName() +
    Math.ceil(Math.random(1000) * 1000);
    settingsPage.typeUserName(randomUsername);
    settingsPage.clickOnUpdateButton();
    settingsPage.assertSuccecfullUpdate();
    settingsPage.clickOnSuccesfullUpdateBtn();
    cy.visit(`/#/@${randomUsername}/`);
    userPage.assertUsernameIsChanged(randomUsername);
  });

  it.only('should provide an ability to update bio', () => {
    const randomBio = faker.lorem.sentences(2);
    settingsPage.typeBio(randomBio);
    settingsPage.clickOnUpdateButton();
    settingsPage.assertSuccecfullUpdate();
    settingsPage.clickOnSuccesfullUpdateBtn();
    cy.visit(`/#/@${user.username}/`);
    userPage.assertBioIsChanged(randomBio);
  });

  it('should provide an ability to update an email', () => {
    const randomEmail = faker.name.firstName() +
    (Math.ceil(Math.random(1000) * 1000)) + '@testMail.com';
    settingsPage.typeEmail(randomEmail);
    settingsPage.clickOnUpdateButton();
    settingsPage.assertSuccecfullUpdate();
    settingsPage.clickOnLogOutButton();
    // TODO:Trzeba dodać logowanie się tym emailem
  });

  it('should provide an ability to update password', () => {
    const randomNumber = Math.ceil(Math.random(1000) * 1000);
    settingsPage.typePassword('Abcd' + randomNumber + `!a`);
    settingsPage.clickOnUpdateButton();
    settingsPage.assertSuccecfullUpdate();
    settingsPage.clickOnLogOutButton();
    // TODO:Trzeba dodać logowanie się tym hasłem
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogOutButton();
    cy.url().should('eq', 'http://localhost:1667/#/');
  });
});
