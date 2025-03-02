/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from "../support/pages/user.PageObject";
const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const homePage = new HomePageObject();

describe("User", () => {
  let user;
  let secondUser;

  before(() => {
    cy.task('db:clear');
    // Generating first user
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      // Registering first user
      cy.register(user.email, user.username, user.password);
    });

    // Generating second user
    cy.task('generateUser').then((generatedUser) => {
    secondUser = generatedUser;
      // Registering second user
      cy.register(secondUser.email, secondUser.username, secondUser.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it("should allow following a user", () => {
    userPage.visitUserPage(secondUser.username);
    userPage.assertCanFollowUser();
    userPage.clickFollowBtn();
    userPage.assertFollowingUser(secondUser.username);
  });

  it('should allow unfollowing a user', () => {
    userPage.visitUserPage(secondUser.username);
    userPage.assertFollowingUser(secondUser.username);
    userPage.clickUnfollowBtn();
    userPage.assertCanFollowUser();
  });
});

