/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to log in with existing credentials', () => {
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update username', () => {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    cy.get('input[placeholder="Your username"]').clear();
    cy.get('input[placeholder="Your username"]').type(user.username + '123');

    cy.contains('button', 'Update Settings').click();

    homePage.visit();
    cy.contains('a[data-cy="username-link"]', user.username + '123');
  });

  it('should provide an ability to update bio', () => {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    cy.get('textarea[placeholder="Short bio about you"]').clear();
    cy.get('textarea[placeholder="Short bio about you"]').type(
      'Just a bio about something'
    );

    cy.contains('button', 'Update Settings').click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.visit(`/#/@${user.username}`);
    cy.contains('p', 'Just a bio about something').should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    cy.get('input[placeholder="Email"]').clear();
    cy.get('input[placeholder="Email"]').type(
      'myemail@gmail.test'
    );

    cy.contains('button', 'Update Settings').click();
  });

  it('should provide an ability to update password', () => {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    cy.get('input[placeholder="Password"]').clear();
    cy.get('input[placeholder="Password"]').type(
      '1234TestPass'
    );

    cy.contains('button', 'Update Settings').click();
  });

  it('should provide an ability to log out', () => {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    cy.get('.btn-outline-danger').click();

    homePage.usernameLink.should('not.exist');
  });
});
