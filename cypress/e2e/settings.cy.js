/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settings = new SettingsPageObject();
const signInPage = new SignInPageObject();
let user;
let newUser;

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.password);
      });
      settings.visit();
    });
  });

  it('should provide an ability to update username', () => {
    settings.typeUserName(newUser.username);
    settings.clickSignUpBtn();

    settings.assertAlert();
    settings.clickSwalBtn();
    settings.userNameField
      .should('have.value', newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settings.typeBio(newUser.bio);
    settings.clickSignUpBtn();

    settings.assertAlert();
    settings.clickSwalBtn();
    settings.bioField.should('have.value', newUser.bio);
  });

  it('should provide an ability to update an email', () => {
    settings.typeEmail(newUser.email);
    settings.clickSignUpBtn();

    settings.assertAlert();
    settings.clickSwalBtn();
    settings.visit();
    settings.emailField.should('have.value', newUser.email);
  });

  it('should provide an ability to update password', () => {
    settings.typePassword(newUser.password);
    settings.clickSignUpBtn();

    settings.assertAlert();
    settings.clickSwalBtn();
    settings.clickLogoutBtn();
    signInPage.visit();
    settings.typeRegisterEmail(user.email);
    settings.typeRegisterPassword(newUser.password);
    settings.clickSignUpBtn();
    settings.assertUserName(user.username);
  });

  it('should provide an ability to log out', () => {
    settings.clickLogoutBtn();

    settings.assertNotExistUserName();
  });
});
