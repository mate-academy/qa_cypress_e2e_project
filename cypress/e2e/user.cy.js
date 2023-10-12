/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

let user;
let newUser;
let article;
const baseUrl = 'http://localhost:1667/#/';

describe('User', () => {
  before(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
      homePage.assertHeaderContainUsername(user.username);
      articlePage.newArticleForm();
      articlePage.fillArticleTitle(article.title);
      articlePage.fillArticleDescription(article.description);
      articlePage.fillArticleBody(article.body);
      articlePage.fillArticleTags(article.tag);
      articlePage.publishArticle();
      articlePage.isArticlePublished(article.title, article.body);
      settingsPage.settingsPageClick();
      settingsPage.clickLogOutBtn();
    });
    cy.task('generateUser').then((generatedUser) => {
      newUser = generatedUser;
      cy.register(newUser.email, newUser.username, newUser.password);
      cy.login(newUser.email, newUser.password);
      homePage.assertHeaderContainUsername(newUser.username);
    });
  });

  it('should be able to follow/unfollow the another user', () => {
    cy.visit(`${baseUrl}@${user.username}`);

    homePage.clickFollowBtn();
    homePage.assertUnfollowBtn();

    homePage.clickUnfollowBtn();
    homePage.assertFollowBtn();
  });
});
