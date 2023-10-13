/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  beforeEach(() => {
    cy.setupUserSession(settingsPage);
  });

  it('should be created using New Article form', () => {
    homePage.clickNewArticleBtn();
    articlePage.typeTitle();
    articlePage.typeTopic();
    articlePage.typeBody();
    articlePage.typeTags();
    articlePage.clickPublishBtn();
    articlePage.assertTitle();
    articlePage.assertBody();
    homePage.clickHomeBtn();
    articlePage.clickYourFeed();
    articlePage.assertTopic();
    articlePage.assertTag();
  });

  it('should be edited using Edit button', () => {
    homePage.clickNewArticleBtn();
    articlePage.typeTitle();
    articlePage.typeTopic();
    articlePage.typeBody();
    articlePage.typeTags();
    articlePage.clickPublishBtn();
    articlePage.clickEditBtn();
    articlePage.typeNewTitle();
    articlePage.typeNewTopic();
    articlePage.typeNewBody();
    articlePage.typeNewTags();
    articlePage.clickPublishBtn();
    articlePage.assertNewTitle();
    articlePage.assertNewBody();
    homePage.clickHomeBtn();
    articlePage.clickYourFeed();
    articlePage.assertNewTopic();
    articlePage.assertNewTag();
  });

  it('should be deleted using Delete button', () => {
    homePage.clickNewArticleBtn();
    articlePage.typeTitle();
    articlePage.typeTopic();
    articlePage.typeBody();
    articlePage.typeTags();
    articlePage.clickPublishBtn();
    articlePage.clickDeleteBtn();
    articlePage.assertDeleteArticle();
  });
});
