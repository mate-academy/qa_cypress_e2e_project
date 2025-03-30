/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require('faker');

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.username, user.password);
      });
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with non-existing email', () => {
    const wrongEmail = faker.internet.email();

    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.verifyWrongLogin('Login failed!');
  });

  it('should not provide an ability to log in with non-existing password', () => {
    const wrongPassword = faker.random.number();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();
    signInPage.verifyWrongLogin('Login failed!');
  });
});
