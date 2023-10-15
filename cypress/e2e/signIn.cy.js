/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const faker = require('faker');
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password);
      signInPage.visit();
    });
    
  });

  it('should provide an ability to login with existing credentials', () => {

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to login with wrong email', () => {
    const wrongEmail = faker.internet.email();

    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.verifyWrongLogin('Login failed!');
    });

  it('should not provide an ability to login with wrong password', () => {
    const wrongPassword = faker.internet.password();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();
    
    signInPage.verifyWrongLogin('Login failed!');
  });
});
