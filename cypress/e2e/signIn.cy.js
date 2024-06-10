/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const faker = require('faker');

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user);
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not log in with not-registered email', () => {
    signInPage.visit();

    signInPage.typeEmail(faker.internet.email());
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.isLoginFailed();
  });

  it('should not log in with not-registered password', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(faker.internet.password());
    signInPage.clickSignInBtn();
    signInPage.isLoginFailed();
  });
});
