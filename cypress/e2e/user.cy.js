/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from
  '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let userFolower;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser')
      .then((generateUser) => {
        user = generateUser;
        cy.register(user.email, user.username, user.password);
      });

    cy.task('generateUser')
      .then((generateUser) => {
        userFolower = generateUser;
        cy.register(userFolower.email, userFolower.username, userFolower.password);
      });
    cy.login();
  });

  it('should be able to follow the another user', () => {
    userPage.visitUserPage(user.username);
    userPage.clickFollowBtn();
    userPage.assertFollowedUser();
  });

  it('should be able to unfollow the another user', () => {
    userPage.visitUserPage();
    userPage.clickFollowBtn();
    userPage.clickUnfollowBtn();
    userPage.assertUnfollowedUser();
  });
});
