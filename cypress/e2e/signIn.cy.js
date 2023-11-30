/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const faker = require('faker');

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  let invalidEmail;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      invalidEmail = faker.random.number({ min: 1, max: 99 }).toString() +
        user.email;
      cy.register(user.username, user.email, user.password);
    });
    signInPage.visit();
  });

  it('should provide ability to log in with registered credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide ability to log in with invalid email', () => {
    signInPage.typeEmail(invalidEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.allertInvalidCredentials();
  });

  it('should not provide ability to log in with empty sign in form', () => {
    signInPage.clickSignInBtn();
    signInPage.allertEmailRequired();
    signInPage.assertSignInLink();
  });
});
