/// <reference types='cypress' />
/// <reference types='../support' />

import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const createArticlePage = new CreateArticlePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
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
    createArticlePage.clickPublishArticle();

    articlePage.assertTitleInBanner(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
    });
    articlePage.clickEditArticleButton();
    createArticlePage.typeTitle(article.newTitle);
    createArticlePage.typeDescription(article.newDescription);
    createArticlePage.typeBody(article.newBody);
    createArticlePage.typeTags(article.newTag);
    createArticlePage.clickPublishArticle();

    articlePage.assertTitleInBanner(article.newTitle);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
      cy.intercept(`/articles/${slug}`).as('deletedArticle')
      articlePage.clickDeleteArticleButton();
      cy.wait('@deletedArticle').its('response.statusCode').should('eq', 200);
    });
  });
});
