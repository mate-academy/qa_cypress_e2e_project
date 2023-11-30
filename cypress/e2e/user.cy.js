/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();
const homePage = new HomePageObject();

describe('User page', () => {
  let user;
  let userFollow;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser2').then((generateUser2) => {
      userFollow = generateUser2;
    });
  });
  // The test is failing because it's not possible to follow a user on the website
  it('should allow to follow the another user', () => {
    cy.login(user.email, user.username, user.password);
    cy.register(userFollow.email, userFollow.username, userFollow.password);

    userPage.visitUserPage(userFollow.username);
    homePage.assertHeaderContainUsername(user.username);
    userPage.assertCanFollowUser();
    userPage.clickFollowBtn();
    userPage.assertFollowingUser();
  });
  // The test is failing because it's not possible to follow a user on the website
  it('should allow to unfollow the another user', () => {
    cy.login(user.email, user.username, user.password);
    cy.register(userFollow.email, userFollow.username, userFollow.password);

    userPage.visitUserPage(userFollow.username);
    userPage.assertCanFollowUser();
    userPage.clickFollowBtn();
    userPage.assertFollowingUser();
    userPage.clickUnfollowBtn();
    userPage.assertUnfollowingUser();
  });
});
