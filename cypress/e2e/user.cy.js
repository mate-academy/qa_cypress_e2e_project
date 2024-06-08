/// <reference types='cypress' />
/// <reference types='../support' />

import { userPage } from '../support/pages//ProjectPages/UserPage';

describe('Article page', () => {
  let user;
  let followinguser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(5);
  });
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('editUser').then((editUser) => {
      followinguser = editUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(followinguser.email
      , followinguser.username, followinguser.password);
    cy.visit(`/#/@${user.username}/`);
    userPage.ClickFollowBtn();
    userPage.AssertFollowing('Unfollow');
    userPage.ClickUnfollowBtn();
    userPage.AssertFollowing('Follow');
  });
});
