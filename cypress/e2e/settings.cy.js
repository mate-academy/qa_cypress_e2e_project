/// <reference types='cypress' />
/// <reference types='../support' />

//import SignInPageObject from '../support/pages/signIn.pageObject';
//import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

//const signInPage = new SignInPageObject();
//const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject()

describe('Settings page', () => {
  let user;
  let changedUser;
  let bio;

  before(() => {
    cy.task('db:clear');
    
    cy.task('generateUser').then((generateUser) => {
      changedUser = generateUser;
    });

    cy.task('generateBio').then((generateBio) => {
      bio = generateBio
    });

    
  });

  beforeEach(() => {
    cy.visit('/#/register');
    
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

    cy.findByPlaceholder('Username').type(user.username);
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(user.password);
    cy.contains('button', 'Sign up').click();
    settingsPage.clickOkBtn();
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.settingsLink.click();
    settingsPage.typeUsername(changedUser.username);
    settingsPage.updateSettingsBtn.click();
    settingsPage.clickOkBtn();
    settingsPage.logoutBtn.click();
    settingsPage.loginLink.click();
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(user.password);
    cy.contains('button', 'Sign in').click();
    cy.findByTestID('profile-nav').should('contain.text', changedUser.username);
    settingsPage.settingsLink.click();
    settingsPage.usernameField
      .invoke('val')
      .should('equal', changedUser.username);
    
  });

  it('should provide an ability to update bio', () => {
    settingsPage.settingsLink.click();
    settingsPage.bioField.type(bio.myBio);
    settingsPage.updateSettingsBtn.click();
    settingsPage.clickOkBtn();
    settingsPage.logoutBtn.click();
    settingsPage.loginLink.click();
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(user.password);
    cy.contains('button', 'Sign in').click();
    settingsPage.settingsLink.click();
    settingsPage.bioField
      .invoke('val')
      .should('equal', bio.myBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.settingsLink.click();
    settingsPage.typeEmail(changedUser.email);
    settingsPage.updateSettingsBtn.click();
    settingsPage.clickOkBtn();
    settingsPage.logoutBtn.click();
    settingsPage.loginLink.click();
    cy.findByPlaceholder('Email').type(changedUser.email);
    cy.findByPlaceholder('Password').type(user.password);
    cy.contains('button', 'Sign in').click();
    settingsPage.settingsLink.click();
    settingsPage.emailField
      .invoke('val')
      .should('equal', changedUser.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.settingsLink.click();
    settingsPage.typePassword(changedUser.password);
    settingsPage.updateSettingsBtn.click();
    settingsPage.clickOkBtn();
    settingsPage.logoutBtn.click();
    settingsPage.loginLink.click();
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(changedUser.password);
    cy.contains('button', 'Sign in').click();
    cy.findByTestID('profile-nav').should('contain.text', user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.settingsLink.click();
    settingsPage.logoutBtn.click();
    cy.assertPageUrl('http://localhost:1667/#/');
  });
});

