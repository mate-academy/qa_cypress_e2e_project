/// <reference types="cypress" />
/// <reference types="../support" />

import NewArticleFormPageObject from '../support/pages/newArticleForm.pageObject';
import ArticlePageObject from '../support/pages/articlePage.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const newArticleFormPage = new NewArticleFormPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let article;
  let user;

  before(() => {
    
  });

  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    newArticleFormPage.visit();

    newArticleFormPage.titleField
      .type(article.title);

    newArticleFormPage.descriptionField
      .type(article.description);

    newArticleFormPage.bodyField
      .type(article.body);

    newArticleFormPage.tagField
      .type(article.tag + '{enter}');

    newArticleFormPage.publishArticleButton
      .click();

    cy.url().should('include', `/articles/${article.title}`);

    articlePage.articleTitle
      .should('contain', article.title);

    articlePage.articleBody
      .should('contain', article.body);

  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag)
    .then((response) => {
      const slug = response.body.article.slug;
      articlePage.visitArticlePage(slug);

    articlePage.editArticleBtn
      .click();

    newArticleFormPage.titleField
      .type(article.title);

    newArticleFormPage.descriptionField
      .type(article.description);

    newArticleFormPage.bodyField
      .type(article.body);

    newArticleFormPage.tagField
      .type(article.tag + '{enter}');

    newArticleFormPage.publishArticleButton
      .click();

    cy.url().should('include', `/articles/${article.title}`);

    articlePage.articleTitle
      .should('contain', article.title + article.title);
  
    articlePage.articleBody
      .should('contain', article.body + article.body);
    });


  });

  it.only('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag)
    .then((response) => {
      const slug = response.body.article.slug;
      articlePage.visitArticlePage(slug);

    articlePage.deleteArticleBtn
      .click();

    homePage.articlesList
      .should('contain', 'No articles are here... yet.')
    });
  });
});
