/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import PopUpPageObject from '../support/pages/popUp.pageObjects';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const popUp = new PopUpPageObject();

describe('Settings page tests', () => {
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    homePage.logInProcess();
    homePage.settingsBtnClick();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateInfoProcess('valid username');

    popUp.popUpAssert('settings: update successful');
    settingsPage.checkThat('username');
  });

  it('should provide an ability to update url', () => {
    settingsPage.updateInfoProcess('valid url');

    popUp.popUpAssert('settings: update successful');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateInfoProcess('valid bio');

    popUp.popUpAssert('settings: update successful');
    settingsPage.checkThat('bio');
  });

  it.skip('should provide an ability to update an email', () => {
    settingsPage.updateInfoProcess('valid email');

    popUp.popUpAssert('settings: update successful');
    settingsPage.checkThat('email');
  });

  it('should provide an ability to update password', () => {
    settingsPage.updateInfoProcess('valid password');

    popUp.popUpAssert('settings: update successful');
    settingsPage.checkThat('password');
  });

  it('should not provide an ability to update password less than 8', () => {
    settingsPage.updateInfoProcess('password less than 8');

    popUp.popUpAssert('settings: failed password');
  });

  it('should not provide an ability to update password without upper', () => {
    settingsPage.updateInfoProcess('password without upper');

    popUp.popUpAssert('settings: failed password');
  });

  it('should not provide an ability to update password without number', () => {
    settingsPage.updateInfoProcess('password without number');

    popUp.popUpAssert('settings: failed password');
  });

  it('should not provide an ability to update password without lower', () => {
    settingsPage.updateInfoProcess('password without lower');

    popUp.popUpAssert('settings: failed password');
  });

  it('should not provide an ability to update email without name', () => {
    settingsPage.updateInfoProcess('email without name');

    popUp.popUpAssert('settings: failed email');
  });

  it('should not provide an ability to update email without at', () => {
    settingsPage.updateInfoProcess('email without at');

    popUp.popUpAssert('settings: failed email');
  });

  it('should not provide an ability to update email without domain', () => {
    settingsPage.updateInfoProcess('email without domain');

    popUp.popUpAssert('settings: failed email');
  });

  it('should not provide an ability to update email without top-domain', () => {
    settingsPage.updateInfoProcess('email without top-domain');

    popUp.popUpAssert('settings: failed email');
  });

  it('should not provide an ability to update email without dot', () => {
    settingsPage.updateInfoProcess('email without dot');

    popUp.popUpAssert('settings: failed email');
  });

  it('should not provide an ability to update email with double at', () => {
    settingsPage.updateInfoProcess('email with double at');

    popUp.popUpAssert('settings: failed email');
  });

  it('should not provide an ability to update email with double dot', () => {
    settingsPage.updateInfoProcess('email with double dot');

    popUp.popUpAssert('settings: failed email');
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOutBtnClick();
    settingsPage.checkThat('logout');
  });
});
