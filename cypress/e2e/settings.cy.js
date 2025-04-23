/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
    return cy.task('generateUser').then((generateUser) => {
      cy.wrap(generateUser).as('user');
      return cy.register(generateUser.email,
        generateUser.username, generateUser.password);
    });
  });

  beforeEach(function () {
    const { email, password } = this.user;

    signInPage.visit();
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to log in with existing credentials',
    function () {
      homePage.assertHeaderContainUsername(this.user.username);
    });

  it('should provide an ability to update username', function () {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    const newUsername = this.user.username + '123';

    cy.get('input[placeholder="Your username"]').as('usernameInput');

    cy.get('@usernameInput').clear();
    cy.get('@usernameInput').type(newUsername);
    cy.contains('button', 'Update Settings').click();

    homePage.visit();
    cy.contains('a[data-cy="username-link"]', newUsername);
  });

  it('should provide an ability to update bio', function () {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    const bio = 'Just a bio about something';

    cy.get('textarea[placeholder="Short bio about you"]').clear();
    cy.get('textarea[placeholder="Short bio about you"]').type(bio);
    cy.contains('button', 'Update Settings').click();

    cy.visit(`/#/@${this.user.username}`);
    cy.contains('p', bio).should('be.visible');
  });

  it('should provide an ability to update an email', function () {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    cy.get('input[placeholder="Email"]').clear();
    cy.get('input[placeholder="Email"]').type('myemail@gmail.test');
    cy.contains('button', 'Update Settings').click();
  });

  it('should provide an ability to update password', function () {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    cy.get('input[placeholder="Password"]').clear();
    cy.get('input[placeholder="Password"]').type('1234TestPass');
    cy.contains('button', 'Update Settings').click();
  });

  it('should provide an ability to log out', function () {
    homePage.usernameLink.click();
    cy.contains('a', 'Edit Profile Settings').click();

    cy.get('.btn-outline-danger').click();
    homePage.usernameLink.should('not.exist');
  });
});
