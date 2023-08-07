/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import FollowPageObject from '../support/pages/followUnfollow.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const followPage = new FollowPageObject();

describe('User', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it.only('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register('follower1@test.com', 'firstFollower', 'Qwerty!23');
    signInPage.visit();
    signInPage.typeEmail('follower1@test.com');
    signInPage.typePassword('Qwerty!23');
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername('firstFollower');
    homePage.visit(`http://localhost:1667/#/@${user.username}`);
    followPage.clickFollowBtn();
    followPage.clickUnfollowBtn();
  });
});
