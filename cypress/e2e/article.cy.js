/// <reference types="cypress" />
/// <reference types="../../support" />

import { faker } from '@faker-js/faker';
import ArticleEditorPage from '../support/pages/articleEditor.pageObject.js';

describe('Article Management', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.registerAndLogin().then((loggedInUser) => {
      user = loggedInUser;
    });
  });

  it('should be created using New Article form', () => {
    const articleTitle = faker.lorem.words(5);
    const articleDescription = faker.lorem.sentence();
    const articleBody = faker.lorem.sentence(10);
    const articleTags = [faker.word.adjective(), faker.word.adjective()];

    ArticleEditorPage.visit();

    ArticleEditorPage.fillArticleForm({
      title: articleTitle,
      description: articleDescription,
      body: articleBody,
      tags: articleTags
    });

    ArticleEditorPage.submitArticleForm();

    cy.url().should('include', '/articles/');
    cy.get('[data-qa="article-title"]').should('contain', articleTitle);
    cy.get('[data-qa="article-body"]').should('contain', articleBody);

    articleTags.forEach((tag) => {
      cy.get('[data-qa="article-tag"]').should('contain', tag);
    });
  });

  it('should be edited using Edit button', () => {
    const originalTitle = faker.lorem.words(5);
    const originalDescription = faker.lorem.sentence();
    const originalBody = faker.lorem.sentence(10);
    const originalTags = [faker.word.adjective()];

    const updatedTitle = faker.lorem.words(6);
    const updatedDescription = faker.lorem.sentence();
    const updatedBody = faker.lorem.sentence(10);
    const updatedTags = [faker.word.adjective(), faker.word.adjective()];

    cy.createArticle({
      title: originalTitle,
      description: originalDescription,
      body: originalBody,
      tags: originalTags,
      author_id: user.id
    }).then((article) => {
      cy.intercept('GET', `/articles/${article.slug}*`).as('getArticle');
      cy.intercept('POST', '/users/login').as('authCheck');
      cy.visit(`/#/articles/${article.slug}`);
      cy.wait('@authCheck');
      cy.wait('@getArticle');

      cy.get('[data-qa="edit-article-button"]').first().click();

      ArticleEditorPage.getTitleInput().clear().type(updatedTitle);
      ArticleEditorPage.getDescriptionInput().clear().type(updatedDescription);
      ArticleEditorPage.getBodyTextarea().clear().type(updatedBody);

      ArticleEditorPage.getTagsInput().find('.ti-tag').each(($el) => {
        cy.wrap($el).find('.ti-icon-close').click();
      });
      updatedTags.forEach((tag) => {
        ArticleEditorPage.getTagsInput().find('input').type(tag + '{enter}');
      });

      ArticleEditorPage.submitArticleForm();

      cy.url().should('include', '/articles/');
      cy.get('[data-qa="article-title"]').should('contain', updatedTitle);
      cy.get('[data-qa="article-body"]').should('contain', updatedBody);
      updatedTags.forEach((tag) => {
        cy.get('[data-qa="article-tag"]').should('contain', tag);
      });
    });
  });

  it('should be deleted using Delete button', () => {
    const articleTitle = faker.lorem.words(5);
    const articleDescription = faker.lorem.sentence();
    const articleBody = faker.lorem.sentence(10);
    const articleTags = [faker.word.adjective()];

    cy.createArticle({
      title: articleTitle,
      description: articleDescription,
      body: articleBody,
      tags: articleTags,
      author_id: user.id
    }).then((article) => {
      cy.intercept('GET', `/articles/${article.slug}*`).as('getArticle');
      cy.intercept('POST', '/users/login').as('authCheck');
      cy.visit(`/#/articles/${article.slug}`);
      cy.wait('@authCheck');
      cy.wait('@getArticle');

      cy.get('[data-qa="delete-article-button"]').first().click();

      cy.url().should('not.include', '/articles/');
      cy.url().should('include', '/');
    });
  });
});
