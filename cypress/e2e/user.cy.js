/// <reference types="cypress" />
/// <reference types="../support" />

import PageObject from "../support/PageObject";
import UserFollowUnfollow from "../support/pages/user.pageObject";

const followUnfollow = new UserFollowUnfollow();

describe('Follow/unfollow button', () => {
  let user;
  let userfollow;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      userfollow = generateUser;
    });
  })

  it.only('should provide an ability to follow the another user', () => {
     
     cy.register(userfollow.email, userfollow.username, userfollow.password);
     
     cy.register();
    
     cy.visit('/#/@' + `${userfollow.username.toLowerCase()}`);
     
     followUnfollow.clickOnFollowUnfollowBtn();
     
     followUnfollow.btnAfterClickIsChange('Unfollow' + ' ' + user.username);
  });

  it('should provide an ability to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    
    cy.visit('/#/profile/'+user.username);
    followUnfollow.clickOnFollowUnfollowBtn();
    
    followUnfollow.btnAfterClickIsChange('Unfollow' + ' ' + user.username);
    followUnfollow.clickOnFollowUnfollowBtn();
    followUnfollow.btnAfterClickIsChange('Follow' + ' ' + user.username);

  })
});
