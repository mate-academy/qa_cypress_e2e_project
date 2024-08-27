/// <reference types='cypress' />
/// <reference types='../support' />

import ArticleEditorPageObject from '../support/pages/articleEditor.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const btnNames = require('../fixtures/buttonNames.json');
const articleTip = require('../fixtures/articleTip.json');

const articleEditor = new ArticleEditorPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('Article page', () => {
  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUserData').as('userData').then((user) => {
      cy.authorization(user).then(({ id }) => {
        cy.task('generateArticle').as('articleData').then((article) => {
          const { slug } = article;

          cy.createArticle(article, id);

          new ArticlePageObject(slug).visit();
        });
      });
    });

    cy.task('generateArticle').as('newArticleData');
  });

  it(`should allow to edit an article using Edit button`, function () {
    const { username } = this.userData;
    const updatedTitle = this.articleData.title + ' edited';
    const updatedDescription = this.articleData.description + ' edited';
    const updatedBody = this.articleData.body + ' edited';
    const { slug } = this.articleData;
    const articlePage = new ArticlePageObject(slug);
    const articleEditor = new ArticleEditorPageObject(slug);

    articlePage.assertBannerContainsEditArticleBtn(btnNames.editArticle);
    articlePage.clickOnEditArticleBtn();

    articleEditor.assertPageUrl(articleEditor.url);
    articleEditor.assertArticleFormContainsArticleParts(this.articleData);
    articleEditor.fillFormAndSubmit(this.articleData, ' edited');

    articlePage.assertPageUrl(articlePage.url);
    articlePage.assertArticleTitleUpdated(updatedTitle);
    articlePage.assertArticleBodyUpdated(updatedBody);
    articlePage.clickOnUsernameLink();

    profilePage.assertUsernameExists(username);
    profilePage
      .assertArticlePreviewIsUpdated(updatedTitle, updatedDescription);
  });

  it(`should allow to completely rewrite an article using Edit button`, function () {
    const { username } = this.userData;
    const {
      title: updatedTitle,
      body: updatedBody
    } = this.newArticleData;
    const { slug } = this.articleData;
    const articlePage = new ArticlePageObject(slug);

    articlePage.clickOnEditArticleBtn();

    articleEditor.assertArticleFormExists();
    articleEditor.editFormAndSubmit(this.newArticleData);

    articlePage.assertPageUrl(articlePage.url);
    articlePage.assertArticleTitleUpdated(updatedTitle);
    articlePage.assertArticleBodyUpdated(updatedBody);
    articlePage.clickOnUsernameLink();

    profilePage.assertUsernameExists(username);
    profilePage
      .assertArticlePreviewIsUpdated(this.newArticleData);
  });

  it(`should be deleted using Delete button`, function () {
    const { username } = this.userData;

    articlePage.assertBannerContainsDeleteArticleBtn(btnNames.deleteArticle);
    articlePage.clickOnDeleteArticleBtn();

    homePage.assertPageUrl(homePage.url);
    homePage.assertNoArticleAvailable(articleTip.noArticle);
    homePage.clickOnUsernameLink();

    profilePage.assertUsernameExists(username);
    profilePage.assertNoArticleAvailable(articleTip.noArticle);
  });
});
