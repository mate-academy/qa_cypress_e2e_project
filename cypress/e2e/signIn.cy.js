/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

const wrongPassword = faker.internet.password();
const wrongEmail = faker.internet.email().toLowerCase();

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

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong Password', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();

    signInPage.assertWrongCredentials();
  });

  it('should not provide an ability to log in with wrong Email', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertWrongCredentials();
  });

  it('should not provide an ability to log in with empty Email', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertEmptyEmail();
  });

  it('should not provide an ability to log in with empty Password', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn();

    signInPage.assertWrongCredentials();
  });
});
