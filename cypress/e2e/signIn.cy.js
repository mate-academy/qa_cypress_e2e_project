/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import PageObject from '../support/PageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const pageObject = new PageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signInPage.visit();
  })

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();

    pageObject.assertErrorWindow('Login failed!')
    pageObject.assertErrorWindow('Invalid user credentials.')
    // cy.get('[role="dialog"]').should('contain', 'Login failed!');
    // cy.get('[role="dialog"]').should('contain', 'Invalid user credentials.');
  });

  it('should not provide an ability to log in with wrong email', () => {
    const email = faker.internet.email();

    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    pageObject.assertErrorWindow('Login failed!')
    pageObject.assertErrorWindow('Invalid user credentials.')
    // cy.get('[role="dialog"]').should('contain', 'Login failed!');
    // cy.get('[role="dialog"]').should('contain', 'Invalid user credentials.');
  });

  it('should not provide an ability to log in with wrong password', () => {
    const password = faker.internet.password();

    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();

    pageObject.assertErrorWindow('Login failed!')
    pageObject.assertErrorWindow('Invalid user credentials.')
    // cy.get('[role="dialog"]').should('contain', 'Login failed!');
    // cy.get('[role="dialog"]').should('contain', 'Invalid user credentials.');
  });
});
