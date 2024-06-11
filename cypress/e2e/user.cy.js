/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const userPage = new UserPageObject();

const user1 = {
  username: 'sandra',
  email: 'sandra@qa.team',
  password: '12345Qwert!'
};

const user2 = {
  username: 'user2_123456',
  email: 'user2_123456@qa.team',
  password: '12345Qwert!'
};

describe('User', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.register(user1.email, user1.username, user1.password);
    cy.register(user2.email, user2.username, user2.password);
  });

  it('should be able to follow the user', () => {
    signInPage.visit();

    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();
    homePage.assertUsernameLink(user1.username);

    userPage.visit(`/#/@${user2.username}`);

    userPage.clickFollowBtn();
    userPage.assertUnfollowBtn();
  });

  it('should be able to unfollow the user (blocked)', () => {
    signInPage.visit();

    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();
    homePage.assertUsernameLink(user1.username);

    userPage.visit(`/#/@${user2.username}`);

    userPage.clickFollowBtn();
    userPage.assertUnfollowBtn();
    userPage.clickUnfollowBtn();
    userPage.assertFollowBtn();
  });
});
