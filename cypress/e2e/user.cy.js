/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let follow;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateFollow').then((generateFollow) => {
      follow = generateFollow;
    });
  });

  it.skip('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.followRegister(follow.email, follow.username, follow.password);
    userPage.visitUserPage(user.username);
    userPage.clickFollowBtn(user.username);
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.followRegister(follow.email, follow.username, follow.password);
    userPage.visitUserPage(user.username);
    userPage.clickFollowBtn(user.username);
    userPage.clickUnfollowBtn();
    userPage.assertUnfollowBtn();
  });
});
