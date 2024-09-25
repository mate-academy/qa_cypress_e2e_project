import ArticlePageObject from '../support/pages/article.pageObject';

/// <reference types='cypress' />
/// <reference types='../support' />

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

  it('should be created by using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/editor');

    articlePage.title.type(article.title);
    articlePage.description.type(article.description);
    articlePage.body.type(article.body);

    articlePage.publishBtn.click();

    cy.get('.banner').should('contain', article.title);
    cy.get('.col-xs-12').should('contain', article.body);
    articlePage.editArticleBtn.should('exist');
    articlePage.deleteArticleBtn.should('exist');
  });

  it('should be edited using Edit button', () => {
    const articleSlugValue = window.localStorage.getItem('slug');
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit(`/#/editor/${articleSlugValue}`);

    articlePage.title.clear();
    articlePage.title.type(article.editTitle);
    articlePage.description.clear();
    articlePage.description.type(article.editDescription);
    articlePage.body.clear();
    articlePage.body.type(article.editBody);

    articlePage.publishBtn.click();

    cy.get('.banner').should('contain', article.editTitle);
    cy.get('.col-xs-12').should('contain', article.editBody);
    articlePage.editArticleBtn.should('exist');
    articlePage.deleteArticleBtn.should('exist');
  });

  it.only('should be deleted using Delete button', () => {
    const articleSlugValue = window.localStorage.getItem('slug');
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.visit(`/#/articles/${article.title}`);

    articlePage.deleteArticleBtn.should('exist');
    articlePage.deleteArticleBtn
      .eq(1)
      .click();
    cy.url().should('not.include', articleSlugValue);
  });
});
