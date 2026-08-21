/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    return cy.task('db:clear')
      .then(() => cy.task('generateUser'))
      .then((generatedUser) => {
        user = generatedUser;

        return cy.register(user.email, user.username, user.password);
      })
      .then((registeredUser) => {
        user.id = registeredUser.id;

        return cy.login(user.email, user.password);
      })
      .then(() => cy.task('generateArticle'))
      .then((generatedArticle) => {
        article = generatedArticle;
      });
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.fillArticle(article);
    articlePage.publish();

    articlePage.assertArticleTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    const updatedTitle = `${article.title}-updated`;

    cy.createArticle(article, user.id).then((createdArticle) => {
      cy.visit(`/#/articles/${createdArticle.slug}`);
    });

    articlePage.editTitle(updatedTitle);
    articlePage.assertArticleTitle(updatedTitle);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article, user.id).then((createdArticle) => {
      cy.visit(`/#/articles/${createdArticle.slug}`);
    });

    articlePage.delete();

    articlePage.assertAlertContains('Deleted the article. Going home...');
    cy.location('hash').should('eq', '#/');
  });
});
