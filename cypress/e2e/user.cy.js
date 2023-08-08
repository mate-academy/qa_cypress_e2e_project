import HomePageObject from '../support/pages/home.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';
import UserPageObject from '../support/pages/user.pageObject.js';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const userPage = new UserPageObject();

let user;

/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    homePage.visit(`#/`);
  });

  it('should be able to follow the another user', () => {
    signInPage.registerAndLogin('1' + user.email,
      '1' + user.username, user.password);
    signInPage.registerAndLogin(user.email, user.username, user.password);
    homePage.visit('#/@1' + user.username);
    userPage.clickOnFollowButton(`Follow 1` + user.username);
    userPage.assertUnfollowButton(`Unfollow 1` + user.username);
  });

  it('should be able to unfollow another user', () => {
    signInPage.registerAndLogin('1' + user.email,
      '1' + user.username, user.password);
    signInPage.registerAndLogin(user.email, user.username, user.password);
    homePage.visit('#/@1' + user.username);
    userPage.clickOnFollowButton(`Follow 1` + user.username);
    userPage.clickOnUnfollowButton(`Unfollow 1` + user.username);
    userPage.assertFollowButton(`Follow 1` + user.username);
  });
});
