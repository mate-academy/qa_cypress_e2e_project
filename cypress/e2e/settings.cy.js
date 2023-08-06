/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsUserPageObject from '../support/pages/settingsUser.pageObject';

const homePage = new HomePageObject();
const settingsUser = new SettingsUserPageObject();

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
    cy.register();
    cy.visit('/#/login');
    cy.signIn();
  });

  it('should provide an ability to update bio', () => {
    cy.wait(5000);
    cy.visit('/#/settings');
    settingsUser.editBio();
    settingsUser.assertSuccesfulEdit();
  });

  it('should provide an ability to update username', () => {
    cy.wait(5000);
    cy.visit('/#/settings');
    cy.wait(5000);
    settingsUser.editUsername();
    settingsUser.assertSuccesfulEdit();

    homePage.homePageRedirect();
    homePage.assertHeaderContainUpdateUsername();
  });

  it('should provide an ability to update an email', () => {
    cy.wait(5000);
    cy.visit('/#/settings');
    cy.wait(5000);
    settingsUser.editEmail();
    settingsUser.assertSuccesfulEdit();
  });

  it('should provide an ability to update password', () => {
    cy.wait(5000);
    cy.visit('/#/settings');
    settingsUser.editPassword();
    settingsUser.assertSuccesfulEdit();
    cy.visit('/#/login');
    cy.findByPlaceholder('Email').type('riot@qa.team');
    cy.findByPlaceholder('Password').type('Tester0111!');
    cy.wait(5000);
    cy.get('[data-cy="username-link"]').contains('riot');
  });

  it('should provide an ability to log out', () => {
    cy.wait(5000);
    cy.visit('/#/settings');
    cy.get('.btn-outline-danger').click();
    cy.get(':nth-child(2) > .nav-link').should('be.visible', 'Sign in');
  });
});
