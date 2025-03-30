/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let user1;
  let user2;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
  });

  it('should be able to follow the another user', () => {
    cy.register(user1.email, user1.username, user1.password);
    cy.register(user2.email, user2.username, user2.password);

    signInPage.visit();

    signInPage.typeEmail(user2.email);
    signInPage.typePassword(user2.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user2.username);
    homePage.assertHomePageUrl();

    userPage.visitUserPage(user1.username);
    userPage.clickFollowButton(user1.username);
    userPage.assertUnfollowBtn();
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user1.email, user1.username, user1.password);
    cy.register(user2.email, user2.username, user2.password);

    signInPage.visit();

    signInPage.typeEmail(user2.email);
    signInPage.typePassword(user2.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user2.username);
    homePage.assertHomePageUrl();

    userPage.visitUserPage(user1.username);
    userPage.clickFollowButton(user1.username);
    userPage.assertUnFollowBtn();
    userPage.clickUnfollowButton(user1.username);

    userPage.assertFollowBtn();
  });
});
