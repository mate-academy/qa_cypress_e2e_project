/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from "../support/pages/signUp.pageObject";
import UserPageObject from "../support/pages/user.pageObject";
import HomePageObject from '../support/pages/home.pageObject';
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const userPage = new UserPageObject();

describe('User', () => {
  beforeEach(() => {
    let user;
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = new Object(generateUser);
    });
    homePage.visit();
  });

  it('should be able to follow the another user', () => {
    userPage.getGlobalFeed();
    userPage.goToProfile();
    userPage.followUser();
    userPage.pageHasUnfollowBtn();
  });

  it('should be able to unfollow the another user', () => {
    userPage.getGlobalFeed();
    userPage.goToProfile();
    userPage.unfollowUser();
    userPage.pageHasFollowBtn();
  });
});
