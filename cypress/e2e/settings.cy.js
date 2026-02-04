/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((u) => {
      user = u;
      cy.register(u.email, u.username, u.password);
    });

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should update username', () => {
    homePage.usernameLink.click();
    cy.getByDataQa('edit-profile').click();

    cy.getByDataQa('settings-username')
      .clear()
      .type(`${user.username}123`);

    cy.getByDataQa('update-settings').click();

    homePage.assertHeaderContainUsername(`${user.username}123`);
  });

  it('should update bio', () => {
    homePage.usernameLink.click();
    cy.getByDataQa('edit-profile').click();

    cy.getByDataQa('settings-bio')
      .clear()
      .type('Just a bio');

    cy.getByDataQa('update-settings').click();

    cy.getByDataQa('user-bio')
      .should('contain', 'Just a bio');
  });

  it('should update email', () => {
    homePage.usernameLink.click();
    cy.getByDataQa('edit-profile').click();

    cy.getByDataQa('settings-email')
      .clear()
      .type('new@mail.test');

    cy.getByDataQa('update-settings').click();

    cy.getByDataQa('settings-email')
      .should('have.value', 'new@mail.test');
  });

  it('should update password', () => {
    homePage.usernameLink.click();
    cy.getByDataQa('edit-profile').click();

    cy.getByDataQa('settings-password')
      .clear()
      .type('NewPass123');

    cy.getByDataQa('update-settings').click();
    cy.getByDataQa('logout').click();

    signInPage.typeEmail(user.email);
    signInPage.typePassword('NewPass123');
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });
});
