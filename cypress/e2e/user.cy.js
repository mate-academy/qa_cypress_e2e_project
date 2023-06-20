/// <reference types="cypress" />
/// <reference types="../support" />

import UserProfilePageObject from '../support/pages/userProfile.pageObject';

const userProfilePage = new UserProfilePageObject();

describe('User', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      
    });
    cy.task('generateNewUser').then(generateNewUser => {
        newUser = generateNewUser;
        cy.register(newUser.email, newUser.username, newUser.password);
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    cy.login(newUser.email, newUser.username, newUser.password);
    cy.visit(`/#/@${user.username}/`);
  })

  it.skip('should be able to follow the another user', () => {
    userProfilePage.clickFollowUser();
    userProfilePage.checkFollowing();
  });

  it.skip('should be able to unfollow the another user', () => {
    userProfilePage.clickUnfollowUser();
    userProfilePage.checkUnfollowing();
 });
});
