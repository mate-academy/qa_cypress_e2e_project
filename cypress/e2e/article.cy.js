/// <reference types='cypress' />
/// <reference types='../support' />

describe('Article', () => {
  before(() => {});

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);

      cy.visit('/#/login');

      cy.get('[data-cy="email-sign-in"]').type(user.email);
      cy.get('[data-cy="password-sign-in"]').type(user.password);
      cy.get('[data-cy="sign-in-btn"]').click();

      cy.get('[data-cy="username-link"]', { timeout: 10000 }).should(
        'contain',
        user.username
      );

      cy.contains('a', 'New Article').click();

      const article = {
        title: `Cypress Article ${Date.now()}`,
        description: 'Article created by an automated test',
        body: 'This is the article content created by Cypress'
      };

      cy.get('input[placeholder="Article Title"]').type(article.title);

      cy.get('input[placeholder="What\'s this article about?"]').type(
        article.description
      );

      cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
        article.body
      );

      cy.contains('button', 'Publish Article').click();

      cy.get('h1', { timeout: 10000 }).should('contain.text', article.title);
    });
  });

  it('should be edited using Edit button', () => {
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);

      cy.visit('/#/login');
      cy.get('[data-cy="email-sign-in"]').type(user.email);
      cy.get('[data-cy="password-sign-in"]').type(user.password);
      cy.get('[data-cy="sign-in-btn"]').click();

      cy.get('[data-cy="username-link"]', { timeout: 10000 }).should(
        'contain',
        user.username
      );

      cy.contains('a', 'New Article').click();

      const articleTitle = `Article to Edit ${Date.now()}`;

      cy.get('input[placeholder="Article Title"]').type(articleTitle);
      cy.get('input[placeholder="What\'s this article about?"]').type(
        'Original description'
      );
      cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
        'Original article body'
      );

      cy.contains('button', 'Publish Article').click();

      cy.get('h1', { timeout: 10000 }).should('contain.text', articleTitle);

      cy.contains('a', 'Edit Article').click();

      cy.get('input[placeholder="Article Title"]').should(
        'have.value',
        articleTitle
      );

      cy.get('input[placeholder="Article Title"]').clear();

      cy.get('input[placeholder="Article Title"]').type(
        `${articleTitle} Updated`
      );

      cy.contains('button', 'Publish Article').click();

      cy.get('h1', { timeout: 10000 }).should(
        'contain.text',
        `${articleTitle} Updated`
      );
    });
  });

  it('should be deleted using Delete button', () => {
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);

      cy.visit('/#/login');
      cy.get('[data-cy="email-sign-in"]').type(user.email);
      cy.get('[data-cy="password-sign-in"]').type(user.password);
      cy.get('[data-cy="sign-in-btn"]').click();

      cy.get('[data-cy="username-link"]', { timeout: 10000 }).should(
        'contain',
        user.username
      );

      cy.contains('a', 'New Article').click();

      const articleTitle = `Article to Delete ${Date.now()}`;

      cy.get('input[placeholder="Article Title"]').type(articleTitle);

      cy.get('input[placeholder="What\'s this article about?"]').type(
        'Article description for deletion'
      );

      cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
        'Article body for deletion'
      );

      cy.contains('button', 'Publish Article').click();

      cy.get('h1', { timeout: 10000 }).should('contain.text', articleTitle);

      cy.contains('button', 'Delete Article').click();

      cy.get('.swal-modal', { timeout: 10000 }).should('be.visible');

      cy.get('.swal-text').should('contain.text', 'Deleted the article.');

      cy.get('body', { timeout: 10000 }).should('not.contain', articleTitle);
    });
  });
});
