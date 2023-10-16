
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
addMatchImageSnapshotCommand();
Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});
Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
      email,
      username,
      password
  }).then(response => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage: "https://static.productionready.io/images/smiley-cyrus.jpg",
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username,
      id: response.body.user.id
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
    return cy.wrap(user).as('createdUser');
  });
});

Cypress.Commands.add('createArticle', (author_id, title, description, body) => {
  cy.request({
    method: 'POST',
    url: '/articles',
    body: {
      article: {
        author_id,
        title,
        description,
        body,
        tags: ""
      }
    }
  });
});