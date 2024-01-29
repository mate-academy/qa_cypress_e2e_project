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
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);
  });

  it('should provide an ability to log in with existing credentials', () => {
    
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong password', () => {
    let wrongPassword = faker.internet.password();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();

    pageObject.assertErrorWindow("Login failed!");
    pageObject.assertErrorWindow("Invalid user credentials.");
  });

  it('should not provide an ability to log in with wrong email', () => {
    let wrongEmail = faker.internet.email();

    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    pageObject.assertErrorWindow("Login failed!");
    pageObject.assertErrorWindow("Invalid user credentials.");
  });
});
