/// <reference types="cypress" />
/// <reference types="../support" />

import UserProfilePageObject from '../support/pages/userProfile.pageObject';
const userProfilePage = new UserProfilePageObject();

describe('User', () => {
  let user; 
  let newUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateUser').then(generateUser => {
      newUser = generateUser;
    });
  });

  it.skip('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(newUser.email, newUser.username, newUser.password);
    cy.login(newUser.email, newUser.password);
    userProfilePage.visitUserPage(user.username);
    userProfilePage.clickFollowBtn();
    userProfilePage.checkFollowing();
  });

  it.skip('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(newUser.email, newUser.username, newUser.password);
    cy.login(newUser.email, newUser.password);
    userProfilePage.visitUserPage(user.username);
    userProfilePage.clickFollowBtn();
    userProfilePage.clickUnfollowBtn();
    userProfilePage.checkUnfollowing();
  });
});
