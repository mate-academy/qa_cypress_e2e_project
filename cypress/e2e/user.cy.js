/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from "../support/pages/user.pageObject";

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let testUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateTestUser').then(generateTestUser => {
      testUser = generateTestUser;
    });
  });

  it.only('should be able to follow the another user', () => {
    cy.registerTestUser(testUser.email, testUser.username, testUser.password);
    cy.register(user.email, user.username, user.password);
    userPage.visit(testUser.username);
    userPage.clickFollowBtn();
    userPage.unfollowBtn.should('exist');
  });
});
