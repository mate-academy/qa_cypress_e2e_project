/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const editArticlePage = new EditArticlePageObject();
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const profilePage = new ProfilePageObject();

describe('User', () => {
  let user;
  let otherUser;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    return cy.task('generateUser')
      .then((u) => {
        user = u;
        return cy.register(u.email, u.username, u.password);
      })
      .then(() => cy.login({ email: user.email, password: user.password }))
      .then(() => cy.task('generateArticle'))
      .then((a) => {
        editArticlePage.visit();
        editArticlePage.createArticle(a.title, a.description, a.body, a.tag);
        cy.location('hash').should('match', /^#\/articles\/.+$/);
      })
      .then(() => {
        settingsPage.visit();
        settingsPage.clickLogoutBtn();
      })
      .then(() => cy.task('generateUser'))
      .then((u2) => {
        otherUser = u2;
        return cy.register(u2.email, u2.username, u2.password);
      })
      .then(() => {
        cy.login({ email: otherUser.email, password: otherUser.password });
        settingsPage.visit();
        homePage.visit();
        homePage.clickYourFeedLink();
        homePage.clickGlobalFeedLink();
      });
  });

  it('should be able to follow the another user', () => {
    articlePage.clickArticleAuthor();
    profilePage.clickFollowBtn();
    profilePage.asserBtnExist('unfollowBtn');
  });

  it('should be able to unfollow the another user', () => {
    articlePage.clickArticleAuthor();
    profilePage.clickFollowBtn();

    profilePage.clickUnfollowBtn();

    profilePage.asserBtnExist('followBtn');
  });
});
