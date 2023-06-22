import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

const faker = require('faker');

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request({
    url: '/users',
    method: 'POST',
    body: {
      email,
      password,
      username
    }
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  cy.request({
    url: '/users',
    method: 'POST',
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.random.word()
    }
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
    cy.request({
      url: '/articles',
      method: 'POST',
      body: {
        article: {
          title,
          description,
          body,
          tags: faker.random.word(),
          author_id: response.body.user.id
        }
      }
    });
  });
});