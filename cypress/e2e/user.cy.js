/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let user2;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateUser2').then((generateUser2) => {
      user2 = generateUser2;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register2(user2.email, user2.username, user2.password);

    userPage.visitUserPage(user.username);
    userPage.checkUserPage(user.username);
    userPage.followButton(user.username);

    userPage.checkUnfollowButton(user.username);
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register2(user2.email, user2.username, user2.password);

    userPage.visitUserPage(user.username);
    userPage.checkUserPage(user.username);
    userPage.followButton(user.username);
    userPage.unfollowButton(user.username);

    userPage.checkFollowButton(user.username);
  });
});
