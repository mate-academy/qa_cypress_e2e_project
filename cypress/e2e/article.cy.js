/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let article;
  let user;

  before(() => {
    return cy.task('db:clear').then(() => {

    });
  });

  beforeEach(() => {
    return cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      return cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
      });
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    articlePage.visit();

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(article.tag);
    articlePage.clickPublishBtn();
    cy.get('h1').should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    articlePage.visit();
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(article.tag);
    articlePage.clickPublishBtn();
    articlePage.clickEditBtn();
    articlePage.typeTitle('edit');
    articlePage.typeDescription('edit');
    articlePage.typeBody('edit');
    articlePage.typeTag('edit');
    articlePage.clickPublishBtn();
    cy.get('h1').should('contain', article.title + 'edit');
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    articlePage.visit();

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTag(article.tag);
    articlePage.clickPublishBtn();
    articlePage.clickDeleteBtn();
    articlePage.AsssertDelete();
  });
});
