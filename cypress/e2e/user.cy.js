/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

  let user;
  let user2;

describe('User', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password);
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.register(user2.username, user2.email, user2.password).then(() => {
        cy.login(user2.email, user2.password);
      });
    });
  });

  it('should be able to follow the another user', () => {
    userPage.visitFollowedUserPage(user.username);
    userPage.clickFollowUserBtn();
    userPage.assertUnfollowBtnExist();
  });

  it('should be able to unfollow the another user', () => {
    userPage.visitFollowedUserPage(user.username);
    userPage.clickFollowUserBtn();
    userPage.clickUnfollowUserBtn();
    userPage.assertFollowBtnExist();
  });
});
