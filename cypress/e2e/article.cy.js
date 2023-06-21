/// <reference types="cypress" />
/// <reference types="../support" />

import { generateNewArticle } from '../support/generateNewArticle';

describe('Create Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      cy.login(generateUser).then(() => generateUser);
    }).as('user');

    cy.visit('/#/editor');
  });

  const { title, description, body, tags } = generateNewArticle();

  it('should be created using New Article form', () => {
    cy.get('[data-qa="article-title"]')
      .type(title);

    cy.get('[data-qa="article-description"]')
      .type(description);
    
    cy.get('[data-qa="article-body"]')
      .type(body);

    cy.get('[data-qa="article-body"]')
      .type(tags);

    cy.get('[data-qa="publish-btn"]')
      .click();
  });
});

describe(`Edit Article`, () => {
  let slug;

  const { title, description, body, tags } = generateNewArticle();

  beforeEach(() => {
    cy.task('db:clear');
    cy.createArticle().then(response => {
      slug = response.body.article.slug;
      cy.wrap(slug).as('articleSlug');

      cy.visit(`/#/articles/${slug}`)

      cy.getByDataQa('edit-article-link')
      .first()
      .click();
   });
  });

  it('should provide an ability for the user to edit the title of his article', () => {
    cy.get('[data-qa="article-title"]')
      .clear()
      .type(title);

    cy.get('[data-qa="publish-btn"]')
      .click();
    
    cy.get('h1')
      .should('contain.text', title);
  });

  it('should provide an ability for the user to edit the description of his article', () => {
    cy.get('[data-qa="article-description"]')
      .clear()
      .type(description);

    cy.get('[data-qa="publish-btn"]')
      .click();
  });

  it('should provide an ability for the user to edit the body of his article', () => {
    cy.get('[data-qa="article-body"]')
      .clear()
      .type(body);
    
    cy.get('[data-qa="publish-btn"]')
      .click();

    cy.visit('/#/');

    cy.get('p')
      .should('contain.text', body);
  });

  it('should provide an ability for the user to edit the tags of his article', () => {
    cy.get('.vue-tags-input')
      .type(tags);

    cy.get('[data-qa="publish-btn"]')
      .click();
    
    cy.visit('/#/');
    
    cy.contains('a', tags)
      .should('exist');
  });
});

describe(`Delete Article`, () => {
    let slug;
  
    beforeEach(() => {
      cy.task('db:clear');
      cy.createArticle().then(response => {
        slug = response.body.article.slug;
        cy.wrap(slug).as('articleSlug');
  
        cy.visit(`/#/articles/${slug}`)
     });
    });

  it('should be deleted using Delete button', () => {
    cy.getByDataQa('delete-article-link')
      .first()
      .click();
    
    cy.url('/#/');

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});
  
