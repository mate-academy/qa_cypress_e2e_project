import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('getByPlaceholder', (placeholder) => {
  return cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage:
        'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('login', (email, password) => {
  return cy.request('POST', '/users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage:
        'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username,
      id: response.body.user.id
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
    return cy.wrap(user).as('user');
  });
});

Cypress.Commands.add('createArticle', (author_id, title, description, body) => {
  return cy.request({
    method: 'POST',
    url: '/articles',
    body: {
      article: {
        author_id,
        title,
        description,
        body,
        tags: ''
      }
    }
  });
});
