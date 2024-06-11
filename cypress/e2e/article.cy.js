/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
const ArticlePage = new ArticlePageObject();
const HomePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });
  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(2000);
  });

  it('should create a new article', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);
    ArticlePage.visit(`/#/@${user.username}/`);
    cy.wait(100);
    cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
    cy.wait(100);
    ArticlePage.fillTitle(article.title);
    ArticlePage.fillDescription(article.description);
    ArticlePage.fillBody(article.body);
    ArticlePage.submit();
    cy.url().should('include', '/article');
    ArticlePage.assert(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);

    cy.createArticle(article.title, article.description, article.body);
    cy.get('h1').should('contain', article.title);
    cy.wait(1000);

    // eslint-disable-next-line max-len
    cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-secondary > span').eq(0).click();
    cy.updateArticle(article.titleNew, article.descriptionNew, article.bodyNew);
    cy.get('h1').should('contain', article.titleNew);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);
    cy.createArticle(article.title, article.description, article.body);
    cy.get('h1').should('contain', article.title);
    cy.wait(1000);
    ArticlePage.delete();
    ArticlePage.visitArticleUrl(article.title);
    cy.get('h1').should('not.contain', article.title);
  });
});
