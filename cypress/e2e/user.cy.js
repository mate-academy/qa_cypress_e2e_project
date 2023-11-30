/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let secondUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      cy.log();
    });
    cy.task('generateUser').then((generateUser) => {
      secondUser = generateUser;
      cy.login(secondUser.email, secondUser.username, secondUser.password);
    });
  });

  it('should be able to follow the another user', () => {
    userPage.visitAnotherUserPage(user.username);
    userPage.clickFollowUserBtn();
    userPage.assertUnfollowBtnExist();
  });

  it('should be able to unfollow the another user', () => {
    userPage.visitAnotherUserPage(user.username);
    userPage.clickFollowUserBtn();
    userPage.clickUnfollowUserBtn();
    userPage.assertFollowBtnExist();
  });
});
