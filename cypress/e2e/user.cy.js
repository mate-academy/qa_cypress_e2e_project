/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();

describe('Follow/unfollow button', () => {
  let user1;
  let user2;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      signInPage.visit();

      user1 = generateUser;

      cy.register(user1.email, user1.username, user1.password);

      signInPage.typeEmail(user1.email);
      signInPage.typePassword(user1.password);
      signInPage.clickSignInBtn();

      cy.wait(2000);

      userPage.visit('/#/settings');

      userPage.logout();
    });

    cy.task('generateUser').then((generateUser) => {
      signInPage.visit();

      user2 = generateUser;

      cy.register(user2.email, user2.username, user2.password);

      signInPage.typeEmail(user2.email);
      signInPage.typePassword(user2.password);
      signInPage.clickSignInBtn();

      cy.wait(2000);
    });
  });

  it.skip('should provide an ability to follow the another user', () => {
    cy.visit('/#/@' + user1.username);

    userPage.clickFollow();

    userPage.followBtn.should('contain.text', 'Unfollow');
  });
});
