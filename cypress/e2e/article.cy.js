/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
let article;
let user;
const newArticlePage = '#/editor';

describe('Article', () => {
  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit(newArticlePage);
    homePage.fillField('title-field', article.title);
    homePage.fillField('description-field', article.description);
    homePage.fillField('body-field', article.body);
    homePage.clickOnBtn('publish-btn');
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.visit(newArticlePage);
    cy.reload();
    cy.createArticle(article.title, article.description, article.body).then((response) => {
      const slug = response.body.article.slug;
      articlePage.visitArticlePage(slug);
    });
    homePage.clickOnBtn('edit-article');
    homePage.fillField('title-field', `{selectAll}${article.title}`);
    homePage.fillField('body-field', `{selectAll}${article.body}`);
    homePage.clickOnBtn('publish-btn');
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be deleted using Delete button', () => {
    cy.visit(newArticlePage);
    cy.reload();
    cy.createArticle(article.title, article.description, article.body).then((response) => {
      const slug = response.body.article.slug;
      articlePage.visitArticlePage(slug);
    });
    homePage.clickOnBtn('delete-article');
    homePage.assertDeletingArticle(article.title);
  });
});
