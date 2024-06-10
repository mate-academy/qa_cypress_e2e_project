/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let followedUser;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      followedUser = generateUser;
      cy.register(followedUser);

      cy.task('generateUser').then((generateUser2) => {
        user = generateUser2;
        cy.register(user);
      });
    });
  });

  it('should be able to follow another user', () => {
    userPage.visitFollowedUserPage(followedUser.username);

    userPage.clickFollowBtn();
    userPage.assertUnfollowBtnExist();
  });
  it('should be able to unfollow following user', () => {
    userPage.visitFollowedUserPage(followedUser.username);

    userPage.clickFollowBtn();
    userPage.clickUnFollowBtn();
    userPage.assertFollowBtnExist();
  });
});
