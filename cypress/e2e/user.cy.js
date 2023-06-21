/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let nextUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateUser').then(generateUser => {
      nextUser = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.login(user.email, user.username, user.password);
    cy.login(nextUser.email, nextUser.username, nextUser.password);
    userPage.visitUserPage(user.username);
    userPage.clickOnFollowBtn();
    userPage.assertSuccessfulFollowUser(user.username);
  });

  it.skip('should be able to unfollow the another user', () => {
    cy.login(user.email, user.username, user.password);
    cy.login(nextUser.email, nextUser.username, nextUser.password);
    userPage.visitUserPage(user.username);
    userPage.clickOnFollowBtn();
    userPage.clickOnUnFollowBtn();
    userPage.assertSuccessfulUnfollowUser(user.username);
  });
});
