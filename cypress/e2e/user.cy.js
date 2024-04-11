/// <reference types='cypress' />
/// <reference types='../support' />

import UsersProfilePageObject from '../support/pages/usersProfile.pageObject';

const usersProfilePage = new UsersProfilePageObject;

describe('User', () => {
  let user;
  let userToFollow;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      userToFollow = generateUser;
    }).then(userToFollow => {
      return cy.register(userToFollow.email, userToFollow.username, userToFollow.password);
    });
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    }).then(user => {
      return cy.register(user.email, user.username, user.password);
    });
  });

  it('should be able to follow the another user', () => {
    // subscribe the user to the userToFollow
    const username = userToFollow.username;
    usersProfilePage.visitUsersProfile(username);
    usersProfilePage.clickOnFollowBtn;

    // assert the [follow] button is changed to the [unfollow] button
    // this test case finds a bug, because the user is not able to follow other users
    usersProfilePage.followButton
      .should('contain.text', "Unfollow");
  });

  it('should be able to unfollow the another user', () => {
    // this test is blocked because of found bug
    // the user is not able to follow other users

    // subscribe the user to the userToFollow
    const username = userToFollow.username;
    usersProfilePage.visitUsersProfile(username);
    usersProfilePage.clickOnFollowBtn;

    // click on the [unfollow] button
    usersProfilePage.clickOnUnfollowBtn;

    // assert the [unfollow] button is changed to the [follow]
    usersProfilePage.followButton
      .should('contain.text', "Follow");
  });
});
