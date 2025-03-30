/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const { faker } = require('@faker-js/faker');
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    signInPage.visit();
  });

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    const fakeEmail = faker.internet.email().toLowerCase();
    const fakePassword = faker.internet.password();

    signInPage.typeEmail(fakeEmail);
    signInPage.typePassword(fakePassword);
    signInPage.clickSignInBtn();

    signInPage.assertPopUpLoginFailed();
  });
});
