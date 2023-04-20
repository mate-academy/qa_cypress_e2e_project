/// <reference types="cypress" />
/// <reference types="../support" />

describe('Article page', () => {
  let article;

  beforeEach(() => {
    cy.task('db:clear'); 
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });   
  });

  it('should be created using New Article form', () => {
    

    cy.intercept('POST', '/users')
    .as('register');

    cy.register();

    cy.visit('/login')

   
    
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body) 
    .then(response => {
      cy.visit(`/articles/${response.body.article.slug}`)
    })
  });

  it.only('should be deleted using Delete button', () => {

    cy.createArticle(article.title, article.description, article.body) 
      .then(response => {
        cy.visit(`/articles/${response.body.article.slug}`)
      })


  });
});
