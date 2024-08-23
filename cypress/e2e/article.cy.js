/// <reference types='cypress' />
/// <reference types='../support' />

import ArticleEditorPageObject from '../support/pages/articleEditor.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const btnNames = require(`../fixtures/buttonNames.json`);
const articleTip = require(`../fixtures/articleTip.json`);

const articleEditor = new ArticleEditorPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();

describe('Article page', () => {
  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUserData').as('userData').then((user) => {
      const userData = user;

      cy.authorization(userData).then(({ id }) => {
        cy.task('generateArticle').as('articleData').then((article) => {
          cy.createArticle(article, id).then(({ slug }) => {
            const articlePage = new ArticlePageObject(slug);

            articlePage.visit();

            cy.wrap(slug)
              .as('articleSlug');
          });
        });
      });
    });

    cy.task('generateArticle').as('newArticleData');
  });

  it(`should allow to edit an article using Edit button`, function () {
    const { username } = this.userData;

    articlePage.assertBannerContainsEditArticleBtn(btnNames.editArticle);
    articlePage.clickOnEditArticleBtn();

    cy.get('@articleSlug').then((slug) => {
      const articleEditor = new ArticleEditorPageObject(slug);
      articleEditor.assertPageUrl(articleEditor.url);
    });

    articleEditor.assertArticleFormContainsArticleParts(this.articleData);

    cy.intercept('PUT', 'articles').as('articleEditing');
    articleEditor.fillFormAndSubmit(this.newArticleData, ` edited`);

    cy.wait('@articleEditing').then((interception) => {
      const {
        slug: updatedSlug,
        title: updatedTitle,
        body: updatedBody,
        description: updatedDescription
      } = interception.response.body.article;

      const articlePage = new ArticlePageObject(updatedSlug);

      articlePage.assertPageUrl(articlePage.url);
      articlePage.assertArticleTitleUpdated(updatedTitle);
      articlePage.assertArticleBodyUpdated(updatedBody);
      articlePage.clickOnUsernameLink();

      profilePage.assertUsernameExists(username);
      profilePage
        .assertArticlePreviewIsUpdated(updatedTitle, updatedDescription);
    });
  });

  it(`should allow to completely rewrite an article using Edit button`, function () {
    const { username } = this.userData;

    const {
      title: updatedTitle,
      body: updatedBody
    } = this.newArticleData;

    articlePage.clickOnEditArticleBtn();

    articleEditor.assertArticleFormExists();

    cy.intercept('PUT', 'articles').as('articleEditing');
    articleEditor.editFormAndSubmit(this.newArticleData);
    cy.wait('@articleEditing').then((interception) => {
      const {
        slug: updatedSlug
      } = interception.response.body.article;

      const articlePage = new ArticlePageObject(updatedSlug);

      articlePage.assertPageUrl(articlePage.url);
      articlePage.assertArticleTitleUpdated(updatedTitle);
      articlePage.assertArticleBodyUpdated(updatedBody);
      articlePage.clickOnUsernameLink();

      profilePage.assertUsernameExists(username);
      profilePage
        .assertArticlePreviewIsUpdated(this.newArticleData);
    });
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
