/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  const user = {
    username: 'qwe' + faker.name.firstName(),
    email: 'qwe' + faker.internet.email(),
    password: 'qW12341234!',
  };

  before(() => {
    
  });

  beforeEach(() => {
    cy.task('db:clear');

    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.clickSignUpCompleteBtn();
    homePage.assertHeaderContainUsername(user.username);
    homePage.clickSettingsLink();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(faker.random.word());
    settingsPage.clickUpdateBtn();
    cy.wait(1000);
    cy.contains('Update successful!').should('be.visible');
    settingsPage.clickOkBtn();
    cy.wait(1000);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(faker.random.word());
    settingsPage.clickUpdateBtn();
    cy.wait(1000);
    cy.contains('Update successful!').should('be.visible');
    settingsPage.clickOkBtn();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(faker.random.word());
    settingsPage.clickUpdateBtn();
    cy.wait(1000);
    cy.contains('Update successful!').should('be.visible');
    settingsPage.clickOkBtn();
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword('qW123123!');
    settingsPage.clickUpdateBtn();
    cy.wait(1000);
    cy.contains('Update successful!').should('be.visible');
    settingsPage.clickOkBtn();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    cy.get(':nth-child(2) > .nav-link').should('contain', 'Sign in');
    cy.get(':nth-child(3) > .nav-link').should('contain', 'Sign up');
  });
});
