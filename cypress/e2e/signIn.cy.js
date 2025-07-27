/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  let invalidEmail;
  let invalidPassword;

  before(() => {
    invalidEmail = faker.internet.email({ allowUnicode: false });
    invalidPassword = faker.internet.password();

    cy.task('db:clear');

    return cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      return cy.register(user.email, user.username, user.password);
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    signInPage.login(user.email, user.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    signInPage.login(invalidEmail, invalidPassword);
    signInPage.assertErrorMessageVisible();
    signInPage.assertErrorMessageContains('Invalid user credentials.');
  });
});
