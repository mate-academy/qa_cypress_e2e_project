/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

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

  it('should allow to follow the another user', () => {
    cy.login(user.email, user.username, user.password);

    cy.register(userFollow.email, userFollow.username, userFollow.password);

    userPage.visitUserPage(userFollow.username);

    userPage.assertFollowUsername(userFollow.username);
    homePage.assertHeaderContainUsername(user.username);

    userPage.clickFollowBtn();

    userPage.assertFollowingUser(userFollow.username);
  });

  it('should allow to unfollow the another user', () => {
    cy.login(user.email, user.username, user.password);

    cy.register(userFollow.email, userFollow.username, userFollow.password);

    userPage.visitUserPage(userFollow.username);

    userPage.assertFollowUsername(userFollow.username);
    homePage.assertHeaderContainUsername(user.username);

    userPage.clickFollowBtn();
    userPage.clickUnfollowBtn();

    userPage.assertUnfollowingUser(userFollow.username);
  });
});
