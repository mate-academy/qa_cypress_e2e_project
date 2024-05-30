/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const homePage = new HomePageObject();
const userPage = new UserPageObject();
const signInPage = new SignInPageObject();

const user2 = {
  username: 'Sasha',
  email: 'Sasha@mail.com',
  password: '12345Qwert!'
};

describe('User', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be able to follow the user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(user2.email, user2.username, user2.password);

    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertUsernameLink(user.username);

    userPage.visit();
    userPage.assertUser2PageUrl();
    userPage.clickFollowBtn();

    userPage.assertUnfollowBtn();
  });

  it('should be able to unfollow the user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(user2.email, user2.username, user2.password);

    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertUsernameLink(user.username);

    userPage.visit();
    userPage.assertUser2PageUrl();
    userPage.clickFollowBtn();
    userPage.assertUnfollowBtn();
    userPage.clickUnfollowBtn();

    userPage.assertFollowBtn();
  });
});
