/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from "../support/pages/user.pageObject";

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let secondUser;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateSecondUser').then((generateSecondUser) => {
      secondUser = generateSecondUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(secondUser.email, secondUser.username, secondUser.password);
    userPage.visitUser(secondUser.username);
    userPage.assertUsername(secondUser.username);
    userPage.clickFollowButton();
    userPage.assertFollowing();
  });

  it('should be able to unfollow the another user', () => {
    //  the test is blocked by an error occurring in a previous test
  });
});
