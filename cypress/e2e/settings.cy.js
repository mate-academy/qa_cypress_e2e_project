/// <reference types="cypress" />
/// <reference types="../support" />

import SettingPageObject from '../support/pages/setting.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingPage = new SettingPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateNewUser').then(generateNewUser => {
        newUser = generateNewUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingPage.visit();

    settingPage.typeNewUsername(newUser.username);
    settingPage.clickUpdateSetting();

    settingPage.checkUpdateSetting();
    
    homePage.checkUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingPage.visit();

    settingPage.typeNewBio(newUser.bio);
    settingPage.clickUpdateSetting();

    settingPage.checkUpdateSetting();
  });

  it.skip('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingPage.visit();

    settingPage.typeNewEmail(newUser.email);
    settingPage.clickUpdateSetting();

    settingPage.checkUpdateSetting();
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingPage.visit();

    settingPage.typeNewPassword(newUser.password);
    settingPage.clickUpdateSetting();

    settingPage.checkUpdateSetting();
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, newUser.username, newUser.password);
    settingPage.visit();

    settingPage.clickLogOut();

    homePage.checkHomeUrl();
  });
});
