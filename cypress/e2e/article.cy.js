/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('Article', () => {
  let article;
  let user;
  let slug;
  let userId;

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
    cy.register(user.email, user.username, user.password);
    articlePage.visit();
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDesc(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(article.tag);
    articlePage.clickPublishArticleBtn();
    cy.get('h1').should('contain', article.title);
    cy.url().should('include', article.title);
  });

  it.only('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        userId = response.body.article.author_id;
      }).then(() => {
        articlePage.visitWithSlug(slug, userId);
      });
  });

  it('should be deleted using Delete button', () => {

  });
});
