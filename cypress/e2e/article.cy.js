/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;
  let editArticle;

  before(() => {
    cy.task('generateUser')
      .then((generateUser) => {
        user = generateUser;
      });

    cy.task('generateArticle')
      .then((generatedArticle) => {
        article = generatedArticle;
      });

    cy.task('generateArticle')
      .then((generatedArticle2) => {
        editArticle = generatedArticle2;
      });
  });

  beforeEach(() => {
    cy.task('db:clear');

    cy.loginAndRegister(
      user.email,
      user.username,
      user.password);

    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    articlePage
      .typeTitle(article.title);

    articlePage
      .typeDescription(article.description);

    articlePage
      .typeBody(article.body);

    articlePage
      .enterTags(article.tag);

    articlePage
      .clickSubmitBtn();

    articlePage
      .assertBannerContainsTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    const {
      title,
      description,
      body
    } = article;

    cy.get('@newUser')
      .then((createdUser) => {
        articlePage
          .createArticleAndRedirect(
            createdUser.id,
            title,
            description,
            body);
      });

    articlePage
      .clickEditBtn();

    articlePage
      .typeTitle(editArticle.title);

    articlePage
      .typeDescription(editArticle.description);

    articlePage
      .typeBody(editArticle.body);

    articlePage
      .clickSubmitBtn();

    articlePage
      .assertBannerContainsTitle(editArticle.title);
  });

  it('should be deleted using Delete button', () => {
    const {
      title,
      description,
      body
    } = article;

    cy.get('@newUser')
      .then((createdUser) => {
        articlePage
          .createArticleAndRedirect(
            createdUser.id,
            title,
            description,
            body);
      });

    articlePage
      .clickDeleteBtn();

    articlePage
      .assertDeletedArticle();
  });
});
