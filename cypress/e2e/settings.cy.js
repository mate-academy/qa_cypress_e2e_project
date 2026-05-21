/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      homePage.usernameLink.click();
      cy.getByDataCy('edit-profile-btn').click();
    });
  });

  it('should provide an ability to update username', () => {
    cy.getByDataCy('settings-username').clear();
    cy.getByDataCy('settings-username').type(user.username + '123');

    cy.getByDataCy('update-settings-btn').click();

    homePage.visit();
    cy.getByDataCy('username-link').should('contain', `${user.username}123`);
  });

  it('should provide an ability to update bio', () => {
    cy.getByDataCy('settings-bio').clear();
    cy.getByDataCy('settings-bio').type('Just a bio about something');

    cy.getByDataCy('update-settings-btn').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1500);

    cy.visit(`/#/@${user.username}`);
    cy.contains('p', 'Just a bio about something').should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    cy.getByDataCy('settings-email').clear();
    cy.getByDataCy('settings-email').type('testuser@gmail.test');

    cy.getByDataCy('update-settings-btn').click();

    cy.get('div[class="swal-title"]').should(
      'contain', 'Update successful!'
    );
  });

  it('should provide an ability to update password', () => {
    cy.getByDataCy('settings-password').clear();
    cy.getByDataCy('settings-password').type('Password123');

    cy.getByDataCy('update-settings-btn').click();

    cy.get('div[class="swal-title"]').should(
      'contain', 'Update successful!'
    );
  });

  it('should provide an ability to log out', () => {
    cy.get('.btn-outline-danger').click();

    homePage.usernameLink.should('not.exist');
  });
});
