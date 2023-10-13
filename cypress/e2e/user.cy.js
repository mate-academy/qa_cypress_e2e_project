/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const userPage = new UserPageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let userToFollow;
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      userToFollow = generateUser;
      cy.register(userToFollow.email, userToFollow.username, userToFollow.password);
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.username, user.email, user.password);
    });
  });

  it('should be able to follow the another user', () => {
    userPage.visitUserPage(userToFollow.username);
    userPage.clickOnFollowBtn();
    userPage.assertUserIsFollowed();
  });

  it('should be able to unfollow the another user', () => {
    //test blocked by "User should be able to follow the another user"
    userPage.visitUserPage(userToFollow.username);
    userPage.clickOnFollowBtn();
    userPage.clickOnUnfollowBtn();
    userPage.assertUserIsUnfollowed();
  });
});
