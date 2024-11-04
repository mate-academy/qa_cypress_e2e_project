/// <reference types='cypress' />
/// <reference types='../support' />

// eslint-disable-next-line max-len
import { generateArticle, generateNewArticle } from '../support/generateArticle';

const user = {
  username: 'wombat098',
  email: 'wombat098@i.ua',
  password: '1234567890'
};

const { title, description, body, tag } = generateArticle();

const { newTitle, newDescription, newBody, newTag } = generateNewArticle();

const articlePayload = {
  title,
  description,
  body,
  taglist: [
    tag
  ]
};

describe('Article', () => {
  beforeEach(() => {
    cy.login(user);
    cy.visit('');
  });

  it('should be created using New Article form', () => {
    cy.contains('.nav-link', 'New Article').click();

    cy.get('[placeholder="Article Title"]').type(title);
    cy.get('[placeholder="What\'s this article about?"]')
      .type(description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(body);
    cy.get('[placeholder="Enter tags"]').type(`${tag}{enter}`);

    cy.contains('.btn', 'Publish Article').click();

    cy.url().should('contain', 'article/');

    cy.contains('.btn', 'Delete Article').click();

    cy.contains('.article-preview', 'No articles are here... yet.')
      .should('be.visible');
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(user, articlePayload);

    cy.contains('.btn', 'Edit Article').click();

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[placeholder="Article Title"]').clear().type(newTitle);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[placeholder="What\'s this article about?"]')
      .clear().type(newDescription);
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.get('[placeholder="Write your article (in markdown)"]')
      .clear().type(newBody);
    cy.get('[placeholder="Enter tags"]').type(`${newTag}{enter}`);

    cy.contains('.btn', 'Update Article').click();

    cy.contains('.btn', 'Delete Article').click();

    cy.contains('.article-preview', 'No articles are here... yet.')
      .should('be.visible');
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(user, articlePayload);

    cy.contains('.btn', 'Delete Article').click();

    cy.contains('.article-preview', 'No articles are here... yet.')
      .should('be.visible');
  });
});
