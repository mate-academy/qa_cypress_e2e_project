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
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });

    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.typeEmail(faker.internet.email());
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.checkWrong('Login failed!');
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(faker.internet.password());
    signInPage.clickSignInBtn();
    signInPage.checkWrong('Login failed!');
  });
});
