/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();

describe('User', () => {
  let user;
  let anotherUser;

  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
    cy.task('generateUser').then((generatedUser) => {
      anotherUser = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should be able to follow another user', () => {
    userPage.visit(anotherUser.username);
    userPage.followUser();

    userPage.assertUserFollowed(anotherUser.username);
  });

  it('should be able to unfollow a followed user', () => {
    userPage.visit(anotherUser.username);
    userPage.unfollowUser();

    userPage.assertUserUnfollowed(anotherUser.username);
  });
});
