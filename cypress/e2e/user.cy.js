/// <reference types='cypress' />
/// <reference types='../support' />

import UserPagePageObject from '../support/pages/userPage.pageObject';

const userPage = new UserPagePageObject();

describe('User', () => {
  let user;
  let followUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateFollowUser').then((generateFollowUser) => {
      followUser = generateFollowUser;
    });
  });

  it.only('should be able to follow the another user', () => {
    cy.login(user.email, user.username, user.password);
    // eslint-disable-next-line max-len
    cy.registerFollowUser(followUser.email, followUser.username, followUser.password);
    userPage.visitUserPage(user.username);
    userPage.followBtn(user.username);
    userPage.assertFollowBtn();
  });

  it('should be able to unfollow the another user', () => {
    cy.login(user.email, user.username, user.password);
    // eslint-disable-next-line max-len
    cy.registerFollowUser(followUser.email, followUser.username, followUser.password);
    userPage.visitUserPage(followUser.username);
    userPage.followBtn();
    userPage.unfollowBtn();
    userPage.assertUnfollowBtn();
  });
});
