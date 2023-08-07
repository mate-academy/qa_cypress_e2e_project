/// <reference types='cypress' />
/// <reference types='../support' />

import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const createArticlePage = new CreateArticlePageObject();
const editArticlePage = new EditArticlePageObject();
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

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    createArticlePage.visit();

    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTags(article.tag);
    createArticlePage.clickOnPublishBtn();

    cy.url().should('include', article.title);
    cy.get('h1').should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article);

    articlePage.clickOnEditBtn();
    editArticlePage.editTitle(article.title + '[Edited]');
    editArticlePage.editDescription(article.description + '[Edited]');
    editArticlePage.editBody(article.body + '[Edited]');
    editArticlePage.editTags(article.tag + '[Edited]');
    editArticlePage.clickOnPublishBtn();

    cy.get('h1').should('contain', article.title + '[Edited]');
  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article);

    articlePage.clickOnDeleteBtn();

    cy.get('h1').should('contain', 'conduit');
    cy.get('p').should('contain', 'A place to share your knowledge.');
  });
});
