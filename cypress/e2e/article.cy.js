/// <reference types='cypress' />
/// <reference types='../support' />

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((res) => { user = res; });
    cy.task('generateArticle').then((res) => { article = res; });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    cy.visit('/#/login');
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
  });

  it('should be created using New Article form', () => {
    cy.contains('.nav-link', 'New Article').click();
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.get('input[placeholder="What\'s this article about?"]')
      .type(article.description);
    cy.get('textarea[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    cy.get('input[placeholder="Enter tags"]').type('testing{enter}');

    cy.contains('button', 'Publish Article').click();

    cy.get('h1').should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.contains('.nav-link', 'New Article').click();
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.contains('button', 'Publish Article').click();

    cy.contains('.btn', 'Edit Article').click();

    cy.get('input[placeholder="Article Title"]').clear();
    cy.get('input[placeholder="Article Title"]').type('Updated Title');

    cy.contains('button', 'Publish Article').click();

    cy.get('h1').should('contain', 'Updated Title');
  });

  it('should be deleted using Delete button', () => {
    cy.contains('.nav-link', 'New Article').click();
    cy.get('input[placeholder="Article Title"]').type(article.title);
    cy.contains('button', 'Publish Article').click();

    cy.get('.btn-outline-danger').contains('Delete Article').click();

    cy.url().should('eq', Cypress.config().baseUrl + '#/');

    cy.get('.article-preview').should('not.exist');
  });
});
