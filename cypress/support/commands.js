import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team',
  username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    const user = {
      username: response.body.user.username,
      email: response.body.user.email,
      bio: response.body.user.bio,
      effectiveImage:
        'https://static.productionready.io/images/smiley-cyrus.jpg',
      image: response.body.user.image,
      token: response.body.user.token,
      userId: response.body.user.id

    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
    cy.wrap(response.body.user.id).as('userID');
  });
});

Cypress.Commands.add('findByPlaceholder', (placeholder, tag = 'input') => {
  cy.get(`${tag}[placeholder="${placeholder}"]`);
});
