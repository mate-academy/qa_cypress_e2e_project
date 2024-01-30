/// <reference types="cypress" />

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa^="${selector}"]`);
});

// eslint-disable-next-line max-len
Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

// eslint-disable-next-line max-len
Cypress.Commands.add('login',
  // eslint-disable-next-line max-len
  (email, password) => {
    cy.request('POST', '/users/login', {
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
    });
  });
