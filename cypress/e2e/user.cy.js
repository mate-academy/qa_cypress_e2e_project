/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/user.pageObjects';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let followedUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      followedUser = generateUser;
      cy.register(followedUser.email, followedUser.username,
        followedUser.password);
    });

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.username, user.password);
      });
    });
  });

  it('should be able to follow the another user', () => {
    userPage.visitPageUser(followedUser.username);
    userPage.clickFollowBtn();
    userPage.assertFollowBtn();
  });

  // This command doesnt worke beacause of bug with btn follow
  it('should be able to unfollow the user', () => {
    userPage.visitPageUser(followedUser.username);
    userPage.clickFollowBtn();
    userPage.clickUnfollowBtn();
    userPage.assertUnfollowBtn();
  });
});
