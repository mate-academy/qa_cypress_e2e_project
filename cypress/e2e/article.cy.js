/// <reference types='cypress' />
/// <reference types='../support' />

import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const createArticlePage = new CreateArticlePageObject();
const articlePage = new ArticlePageObject()

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    createArticlePage.visit();
    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTags(article.tag);
    createArticlePage.clickOnPublishArticleBtn();

    articlePage.assertArticleTitle(article.title);

  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
    });

    articlePage.clickOnEditArticle();

    createArticlePage.typeTitle(article.newTitle);
    createArticlePage.typeDescription(article.newDescription);
    createArticlePage.typeBody(article.newBody);
    createArticlePage.typeTags(article.newTag);
    createArticlePage.clickOnPublishArticleBtn();

    articlePage.assertArticleTitle(article.newTitle);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
      cy.intercept(`/articles/${slug}`).as('articleDeleted');
      articlePage.clickOnDeleteArticle();
      cy.wait('@articleDeleted').its('response.statusCode').should('eq', 200);
    });
  });
});
