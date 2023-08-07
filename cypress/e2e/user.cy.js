/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const userPage = new UserPageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let user;
  let user1;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.login(user.email, user.username, user.password);
    cy.register(user1.email, user1.username, user1.password);

    userPage.visitUserPage(user1.username);

    homePage.assertHeaderContainUsername(user.username);
    userPage.assertUsernameToFollow(user1.username);

    userPage.clickOnFollowBtn(user1.username);

    userPage.assertFollowing(user1.username);
  });

  it('should be able to unfollow the another user', () => {
    cy.login(user.email, user.username, user.password);
    cy.register(user1.email, user1.username, user1.password);

    userPage.visitUserPage(user1.username);

    homePage.assertHeaderContainUsername(user.username);
    userPage.assertUsernameToFollow(user1.username);

    userPage.clickOnFollowBtn(user1.username);
    userPage.clickOnUnfollowBtn(user1.username);

    userPage.assertUnfollowing(user1.username);
  });
});
