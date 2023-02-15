/// <reference types="cypress" />
/// <reference types="../support" />

const { generateUser } = require("../support/generate");
const { generateArticle } = require("../support/generate");

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    const { username, email, password } = generateUser();
    const { title, description, body, tag } = generateArticle();

    cy.login(username, email, password);

    cy.visit('/#/editor');
    
    cy.getByDataCy('title')
      .type(title);
    
    cy.getByDataCy(`description`)
      .type(description);
    
    cy.getByDataCy('body')
      .type(body);
    
    cy.get('[placeholder="Enter tags"]')
      .type(`${tag}{enter}`);
    
    cy.getByDataCy('publish')
      .click();
    
    cy.url()
      .should('include', `/#/articles/${title}`)
  });
  
  it('should be edited using Edit button', () => {
    const { title, description, body } = generateArticle();

    cy.article(title, description, body);

    cy.visit(`/#/articles/${title}`)
    
    cy.get('.banner')
      .contains('span', 'Edit Article')
      .click();
    
    cy.getByDataCy('title')
      .type('_new');
    
    cy.getByDataCy('publish')
      .click();
    
    cy.contains('h1', `${title}_new`)
      .should('exist');
  });

  it('should be deleted using Delete button', () => {
    const { title, description, body } = generateArticle();

    cy.article(title, description, body);

    cy.visit(`/#/articles/${title}`)
    
    cy.get('.banner')
      .contains('button', 'Delete Article')
      .click();
    
    cy.getByDataCy('username-link')
      
    cy.contains('div', 'No articles are here... yet.')
      .should('exist');
  });
});
