/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import ArticleEditorPageObject from '../support/pages/articleEditor.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';

const btnNames = require('../fixtures/buttonNames.json');
const validation = require('../fixtures/validationMessages.json');

const articleEditor = new ArticleEditorPageObject();
const articlePage = new ArticlePageObject();
const profilePage = new ProfilePageObject();

describe(`'New Article' form`, () => {
  beforeEach(() => {
    cy.wrap(Cypress.currentTest.title).as('testTitle');

    cy.task('db:clear');

    cy.task('generateArticle').as('articleData');

    cy.task('generateUserData').as('userData').then((userData) => {
      cy.authorization(userData);
    });

    articleEditor.visit();
  });

  it(`should contain main components`, () => {
    articleEditor.assertArticleFormExists(btnNames.publishArticle);
  });

  it(`should allow to create an article`, function () {
    const { username } = this.userData;
    const { body } = this.articleData;

    cy.intercept('POST', 'articles').as('articleCreation');

    articleEditor.fillFormAndSubmit(this.articleData);

    cy.wait('@articleCreation').then((interception) => {
      const slug = interception.response.body.article.slug;

      const articlePage = new ArticlePageObject(slug);
      articlePage.assertPageUrl(articlePage.url);
    });

    articlePage.assertBannerContainsArticleInfo(username, this.articleData);
    articlePage.assertArticleBodyExists(body);
    articlePage.clickOnUsernameLink();

    profilePage.assertUsernameExists(username);
    profilePage.assertArticlePreviewAvailable(username, this.articleData);
  });

  it(`should allow to create an article with the empty 'Enter Tags' field`, function () {
    const { username } = this.userData;
    const { body } = this.articleData;

    cy.intercept('POST', 'articles').as('articleCreation');

    articleEditor.fillFormAndSubmit(this.articleData);

    cy.wait('@articleCreation').then((interception) => {
      const slug = interception.response.body.article.slug;

      const articlePage = new ArticlePageObject(slug);

      articlePage.assertPageUrl(articlePage.url);
    });

    articlePage.assertBannerContainsArticleInfo(username, this.articleData);
    articlePage.assertArticleBodyExists(body);
    articlePage.clickOnUsernameLink();

    profilePage.assertUsernameExists(username);
    profilePage.assertArticlePreviewAvailable(username, this.articleData);
  });

  it(`should not allow to create an article with the empty 'Article Title' field`, function () {
    articleEditor.fillFormAndSubmit(this.articleData);

    articleEditor.assertPageUrl(articleEditor.url);
    articleEditor.assertErrorMessage(validation.error.articleForm);
  });
});
