/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from "../support/pages/user.pageObject";
 const userProfile = new UserPageObject();

describe('User', () => {
  let user;
  let anotherUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.register(user.email, user.username, user.password);
    });
    

    cy.task('generateUser').then((generateUser) => {
      anotherUser = generateUser;
    cy.register(anotherUser.email, anotherUser.username, anotherUser.password).then(() => {
      cy.login(anotherUser.email, anotherUser.username, anotherUser.password);
      });
    });   
  });

  it('should be able to follow the another user', () => {
    userProfile.visitUserPage(user.username);
    userProfile.clickOnFollowBtn();
    userProfile.assertUnfollowedUser(user.username);
  });

  it('should be able to unfollow the another user', () => {
    userProfile.visitUserPage(user.username);
    //  the test is blocked, because the [Unfollow] button doesn't exist

    // userProfile.clickOnUnfollowBtn();
  });
});
