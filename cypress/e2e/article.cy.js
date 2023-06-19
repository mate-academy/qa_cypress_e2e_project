/// <reference types="cypress" />
/// <reference types="../support" />

import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const publishArticle = new NewArticlePageObject();
const articlePage = new ArticlePageObject();

const testData = {
  articleTitle: 'edited_title',
  articleDescription: 'edited_description',
  articleBody: 'edited_body'
};

describe('Article', () => {
  let article;

  before(() => {
    
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login();
    cy.wait(500);
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
   });

  it.only('should be created using New Article form', () => {
    publishArticle.visit();
    publishArticle.articleTitleField.clear().type(article.title);
    // publishArticle.articleDescriptionField.clear().type(article.description);
    // publishArticle.articleBodyField.clear().type(article.body);
    // publishArticle.publishBtn.click();
    // cy.get().should('contain', article.title);

    // cy.visit('http://localhost:1667/#/editor');
    // cy.get('[placeholder="Article Title"]').clear().type(article.title);
    // cy.get('[placeholder="Write your article (in markdown)"]').clear().type(article.body);
    // cy.contains('.btn', 'Publish Article').click();
    // cy.wait(500);
  });

  it('should be edited using Edit button', () => {
    // publishArticle.articleTitleField.clear().type(article.title);
    // publishArticle.articleDescriptionField.clear().type(article.description);
    // publishArticle.articleBodyField.clear().type(article.body);
    // publishArticle.publishBtn.click();
    // cy.get().should('contain', testData.articleTitle);

    // cy.visit(`http://localhost:1667/#/articles/${article.title}`);

    // articlePage.editArticleBtn.click();

    // publishArticle.articleTitleField.clear().type(testData.articleTitle);
    // publishArticle.articleDescriptionField.clear().type(testData.articleDescription);
    // publishArticle.articleBodyField.clear().type(testData.articleBody);
    // publishArticle.publishBtn.click();
    // cy.get().should('contain', testData.articleTitle);


    cy.visit('http://localhost:1667/#/editor');
    cy.get('[placeholder="Article Title"]').clear().type(article.title);
    cy.get('[placeholder="Write your article (in markdown)"]').clear().type(article.body);
    cy.contains('.btn', 'Publish Article').click();
    cy.wait(500);
    
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    cy.get('.banner').should('contain', article.title);

    cy.contains('.btn', 'Edit Article').click();
    cy.get('[placeholder="Article Title"]').clear().type(testData.articleTitle);
    cy.get('[placeholder="Write your article (in markdown)"]').clear().type(testData.articleBody);
    cy.contains('.btn', 'Publish Article').click();
    cy.wait(500);
    cy.get('.banner').should('contain', testData.articleTitle);
  });

  it('should be deleted using Delete button', () => {
    // publishArticle.articleTitleField.clear().type(article.title);
    // publishArticle.articleDescriptionField.clear().type(article.description);
    // publishArticle.articleBodyField.clear().type(article.body);
    // publishArticle.publishBtn.click();
    // cy.get().should('contain', article.title);

    // cy.visit(`http://localhost:1667/#/articles/${article.title}`);

    // articlePage.deleteArticleBtn.click();

    cy.visit('http://localhost:1667/#/editor');
    cy.get('[placeholder="Article Title"]').clear().type(article.title);
    cy.get('[placeholder="Write your article (in markdown)"]').clear().type(article.body);
    cy.contains('.btn', 'Publish Article').click();
    cy.wait(500);
    
    cy.visit(`http://localhost:1667/#/articles/${article.title}`);
    cy.get('.banner').should('contain', article.title);

    cy.contains('.btn', 'Delete Article').click();
    cy.wait(3000);

    cy.visit(`http://localhost:1667/#/@riot/`);
    cy.get('.profile-page').should('contain', 'No articles are here... yet.');
  });
});
