/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
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

  it('should not provide an ability to log in with wrong email', () => {
    cy.register(user.email, user.username, user.password);
    const wrongEmail = faker.internet.email();

    signInPage.typeEmail(wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertWrongCredentials();
  });

  it('should not provide an ability to log in with wrong password', () => {
    cy.register(user.email, user.username, user.password);
    const wrongPassword = faker.internet.password();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongPassword);
    signInPage.clickSignInBtn();
    signInPage.assertWrongCredentials();
  });
});
