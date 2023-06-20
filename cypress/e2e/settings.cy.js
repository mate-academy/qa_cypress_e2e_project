/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPage from "../support/pages/settingPage.pageObject";
import faker from 'faker';

const settingPage = new SettingsPage();

let user;
let testData;

describe('Settings page', () => {
  before(() => {
    testData = {
      bio: faker.lorem.words(),
      userName: faker.name.firstName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password()
    };
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(500);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingPage.clearUsername();
    settingPage.typeUsername(testData.userName);
    settingPage.clickUpdateBtn();
    settingPage.checkUserNameData(testData.userName);
  });

  it('should provide an ability to update bio', () => {
    settingPage.clearBio();
    settingPage.typeBio(testData.bio);
    settingPage.clickUpdateBtn();
    settingPage.checkBioData(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingPage.clearEmail();
    settingPage.typeEmail(testData.email);
    settingPage.clickUpdateBtn();
    settingPage.checkEmail(testData.email);
  });

  it('should provide an ability to update password', () => {
    settingPage.clearPassword();
    settingPage.typePassword(testData.password);
    settingPage.clickUpdateBtn();
    settingPage.assertSuccessfulUpdate('Update successful!');
  });

  it('should provide an ability to log out', () => {
    settingPage.clickLogoutButton();
    settingPage.assertLogout();
  });
});
