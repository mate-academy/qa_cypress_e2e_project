/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';
const userObject = new UserPageObject();

describe('User', () => {

  let user;
  let follower;
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateUser').then((generateUser) => {
      follower = generateUser;
      cy.login(follower.email, follower.username, follower.password);
    });
  });

  it('should be able to follow the another user', () => {
    userObject.visitFollowedUserPage(user.username);
    userObject.clickFollowUserBtn();
    userObject.assertUnfollowBtnExist();
  });

  it('should be able to unfollow the another user', () => {
    userObject.visitFollowedUserPage(user.username);
    userObject.clickFollowUserBtn();
    userObject.clickUnfollowUserBtn();
    userObject.assertFollowBtnExist();
  });
});
