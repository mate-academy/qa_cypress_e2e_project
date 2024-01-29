/// <reference types='cypress' />
/// <reference types='../support' />

import { UserPageObject } from '../support/pages/user.pageObject';

describe('User', () => {
  const userPage = new UserPageObject();
  let user1;
  let user2;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user1.email, user1.username, user1.password);
    cy.login(user2.email, user2.username, user2.password);
    cy.visit('/@' + user1.username);
    userPage.clickOnTheFollowProfileLink();
    userPage.clickOnFollowButton();
    userPage.assertUnfollowProfileButton();
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user1.email, user1.username, user1.password);
    cy.login(user2.email, user2.username, user2.password);
    cy.visit('/@' + user1.username);
    userPage.clickOnFollowButton();
    userPage.clickOnUnFollowButton();
    userPage.assertFollowBtn();
  });
});
