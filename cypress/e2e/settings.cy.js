/// <reference types="cypress" />
/// <reference types="../support" />


import SettingsPageObject from "../support/pages/settings.pageObject";
import homePageObject from "../support/pages/home.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import faker from "faker";

const settingsPage = new SettingsPageObject;
const homePage = new homePageObject;
const signInPage = new SignInPageObject;

describe('Settings page', () => {
  let user;

  const newInfo = {
    username: faker.name.firstName().toLowerCase(),
    bio: faker.lorem.words(),
    email: faker.internet.email().toLowerCase(),
    password: 'Qwerty123!'
  } 
  
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });
  
  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(500);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.updateUsernameField(newInfo.username);
    settingsPage.clickOnUpdateBtnSet();

    settingsPage.successUpdate();
    settingsPage.closeModalWindow();

    cy.getByDataCy('username-link').should('contain', newInfo.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.updateBioField(newInfo.bio);
    settingsPage.clickOnUpdateBtnSet();

    settingsPage.successUpdate();
    settingsPage.closeModalWindow();

    cy.getByDataCy('username-link').click();
    cy.get('.user-info')
      .should('contain', newInfo.bio);
  });

  it.skip('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.updateEmailField(newInfo.email);
    settingsPage.clickOnUpdateBtnSet();

    settingsPage.successUpdate();
    settingsPage.closeModalWindow();
    
    cy.clearCookies();
    signInPage.visit();
    signInPage.emailField.type(newInfo.email);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();

    cy.getByDataCy('username-link').should('contain', user.username);
  });

  it.skip('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.updatePasswordField(newInfo.password);
    settingsPage.clickOnUpdateBtnSet();

    settingsPage.successUpdate();
    settingsPage.closeModalWindow();
    
    cy.clearCookies();
    cy.reload();

    signInPage.visit();
    cy.login(user.email, user.username, newInfo.password);
    settingsPage.visit();
    cy.getByDataCy('username-link').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickOnLogOutBtnSet();
    
    cy.get('.navbar-nav')
      .should('contain', 'Sign in')
      .and('contain', 'Sign up');
  });
});
