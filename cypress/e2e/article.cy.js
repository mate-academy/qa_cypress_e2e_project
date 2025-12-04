/* eslint-disable cypress/unsafe-to-chain-command */
/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('Article tests', () => {
  before(() => {
    // Можно здесь зарегистрировать или залогинить пользователя
    cy.registerAndLogin('testuser', 'testuser@example.com', 'password123');
  });

  beforeEach(() => {
    cy.task('db:clear'); // Очистка базы перед каждым тестом
    cy.login('testuser@example.com', 'password123');
    cy.visit('/');
  });

  it('should create a new article using New Article form', () => {
    cy.get('[data-qa=new-article]').click();
    cy.get('[data-qa=article-title]').type('My Test Article');
    cy.get('[data-qa=article-description]').type('Article description');
    cy.get('[data-qa=article-body]').type('This is the content of the article.');
    cy.get('[data-qa=publish-article]').click();
    cy.contains('My Test Article').should('exist');
  });

  it('should edit an article using Edit button', () => {
    cy.createArticle('Original Article', 'Desc', 'Body'); // кастомная команда для создания статьи
    cy.get('[data-qa=edit-article]').click();
    cy.get('[data-qa=article-title]').clear().type('Edited Article');
    cy.get('[data-qa=publish-article]').click();
    cy.contains('Edited Article').should('exist');
  });

  it('should delete an article using Delete button', () => {
    cy.createArticle('Delete Me', 'Desc', 'Body');
    cy.get('[data-qa=delete-article]').click();
    cy.contains('Delete Me').should('not.exist');
  });
});
