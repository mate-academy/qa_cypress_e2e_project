/// <reference types='cypress' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;
  function createArticle() {
    cy.createArticle(
      article.title,
      article.description,
      article.body
    ).then((response) => {
      cy.log(response);
      const slug = response.body.article.slug;

      cy.visit(`#/articles/${slug}`);
    });

    return true;
  }

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('#/editor');

    articlePage.typeArticleTitleField(article.title);
    articlePage.typeArticleAboutField(article.description);
    articlePage.typeArticleBioField(article.body);
    articlePage.clickArticlePublishBtn();
    articlePage.assertArticleTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    const message = 'Publish Article';

    createArticle();

    articlePage.clickEditArticle();
    articlePage.assertEditArticle(message);
  });

  it('should be deleted using Delete button', () => {
    const message = 'No articles are here... yet.';

    createArticle();

    articlePage.clickDeleteArticle();
    articlePage.assertDeleteArticle(message);
  });
});
