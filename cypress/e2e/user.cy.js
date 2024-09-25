/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const userPage = new UserPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('User', () => {
  let user;
  let userFollow;

  before(() => {
    cy.task('db:clear');
    // Generating second users
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      // Registering first user
      cy.register(user.email, user.username, user.password);
    });

    cy.task('generateUser2').then((generatedUser) => {
      userFollow = generatedUser;
      // Registration of second user
      cy.register(userFollow.email, userFollow.username, userFollow.password);
    });
  });

  beforeEach(() => {
    // Login in as first user before test
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should be able to follow another user', () => {
    userPage.visitUserPage(userFollow.username);
    userPage.assertCanFollowUser();
    userPage.clickFollowBtn();
    userPage.assertFollowingUser(userFollow.username);
  });

  it('should be able to unfollow another user', () => {
    userPage.visitUserPage(userFollow.username);
    userPage.assertFollowingUser(userFollow.username);
    userPage.clickUnfollowBtn();
    userPage.assertCanFollowUser();
  });
});
