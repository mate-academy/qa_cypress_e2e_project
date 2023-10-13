/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from "../support/pages/user.PageObject";

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let userFollower;

  beforeEach(() => {
    cy.task('db:clear');
    
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.register(user.email, user.username, user.password);
    });

    cy.task('generateUser').then((generateUser) => {
      userFollower = generateUser;
    cy.register(userFollower.email, userFollower.username, userFollower.password);
    });
    cy.login();
  });

  it('should be able to follow the another user', () => {
    userPage.visit(user.username);
    userPage.clickFollowBtn();
    userPage.accertFollowerUser();
  });

  it('should be able to follow the another user', () => {
    userPage.visit(user.username);
    userPage.clickUnfollowBtn();
    userPage.accertUnfollowerUser();
  });
});
