/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from "../support/pages/profile.pageObject";

const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.newEmail, user.newUsername, user.newPassword);
    cy.visit(`/#/@${user.username.toLowerCase()}`);
  });

  it('should be able to follow the another user', () => {
    profilePage.clickOnFollowBtn();
    profilePage.assertUnfollowBtn();
  });

  it('should be able to unfollow the another user', () => {
    profilePage.clickOnFollowBtn();
    profilePage.assertUnfollowBtn();
    profilePage.clickOnFollowBtn();
    profilePage.assertFollowBtn();
  });
});
