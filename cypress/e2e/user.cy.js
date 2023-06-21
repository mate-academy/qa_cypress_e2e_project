/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/userPage.pageObject';

const homePage = new HomePageObject();
const userPage = new UserPageObject();
const signInPage = new SignInPageObject();

const userData1 = {
  username: 'riot1',
  email: 'riot1@qa.team',
  password: '12345Qwert!'
};

const userData2 = {
  username: 'riot2',
  email: 'riot2@qa.team',
  password: '12345Qwert!'
};

describe('User', () => {
  beforeEach(() => {
    homePage.clearDatabase();
  });

  it('should be able to follow the another user', () => {
    cy.register(
      userData1.email,
      userData1.username,
      userData1.password
    );
    cy.register(
      userData2.email,
      userData2.username,
      userData2.password
    );

    signInPage.visit();

    signInPage.typeEmailField(userData1.email);
    signInPage.typePasswordField(userData1.password);
    signInPage.clickSignInBtn();
    homePage.assertUsernameLink(userData1.username);

    userPage.visit();
    userPage.clickFollowBtn();
  });
});
