/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from "../support/pages/user.PageObject";

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let follower;

  beforeEach(() => {
    cy.task('db:clear');  
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      follower = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(follower.email, follower.username, follower.password);
    cy.login();
    userPage.visit(user.username);
    userPage.clickFollowBtn();
    userPage.accertFollowerUser();
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(follower.email, follower.username, follower.password);
    cy.login();
    userPage.visit(user.username);
    userPage.clickUnfollowBtn();
    userPage.accertUnfollowerUser();
  });
});