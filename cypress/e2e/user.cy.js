/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const btnNames = require('../fixtures/buttonNames.json');

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe(`User`, () => {
  let articleData;

  before(() => {
    cy.task('generateArticle').then((article) => {
      articleData = article;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUserData').as('userToFollow').then((userData) => {
      cy.authorization(userData).then((user) => {
        cy.createArticle(articleData, user.id);
      });
    });

    cy.task('generateUserData').as('userFollower').then((userData) => {
      cy.authorization(userData).then(({ username }) => {
        const profilePage = new ProfilePageObject(username);
        profilePage.visit();
      });
    });

    homePage.visit();
  });

  it(`should be able to follow the another user from the 'Article' page`, () => {
    homePage.clickOnArticleTitle();
    articlePage.assertBannerContainsFollowBtn(btnNames.followUser);
    articlePage.clickOnFollowBtn();
    articlePage.assertFollowBtnIsUnfollow(btnNames.unfollowUser);
  });

  it(`should be able to unfollow the another user from the 'Article' page`, function () {
    const { username } = this.userToFollow;

    cy.followUser(username);

    homePage.clickOnArticleAuthor();
    articlePage.assertFollowBtnIsUnfollow(btnNames.unfollowUser);
    articlePage.clickOnFollowBtn();
    articlePage.assertBannerContainsFollowBtn(btnNames.followUser);
  });

  it(`should be able to follow the another user from the 'Pofile' page`, function () {
    const { username } = this.userToFollow;

    homePage.clickOnArticleAuthor();
    profilePage.assertUsernameExists(username);
    profilePage.assertFollowUserBtnExist(btnNames.followUser);
    profilePage.clickOnFollowUserBtn();
    profilePage.assertUnfollowUserBtnExist(btnNames.unfollowUser);
  });

  it(`should be able to unfollow the another user from the 'Profile' page`, function () {
    const { username } = this.userToFollow;

    cy.followUser(username);

    profilePage.assertUnfollowUserBtnExist(btnNames.unfollowUser);
    profilePage.clickOnFollowUserBtn();
    profilePage.assertFollowUserBtnExist(btnNames.followUser);
  });
});
