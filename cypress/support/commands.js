// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team',
  username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', 'users/', {
    email,
    username,
    password
  });
});

// Cypress.Commands.add('login', (email, password) => {
//   cy.request({
//     method: 'POST',
//     url: '/api/users/login',
//     body: {
//       user: {
//         email,
//         password
//       }
//     }
//   }).then((response) => {
//     const user = {
//       bio: response.body.user.bio,
//       effectiveImage: response.body.user.image,
//       email: response.body.user.email,
//       image: response.body.user.image,
//       token: response.body.user.token,
//       username: response.body.user.username
//     };
//     window.localStorage.setItem('user', JSON.stringify(user));// Correctly set key as a string
//     cy.setCookie('auth', response.body.user.token);
//   });
// });

Cypress.Commands.add('createArticle', (title, description, body) => {
  return cy.getCookie('auth').then((token) => {
    const authToken = token.value;

    return cy.request({
      method: 'POST',
      url: '/api/articles',
      body: {
        article: {
          title,
          description,
          body,
          tagList: []
        }
      },
      headers: {
        Authorization: `Token ${authToken}`
      }
    });
  });
});

Cypress.Commands.add('findByPlaceholder', (placeholder, tag = 'input') => {
  cy.get(`[placeholder="${placeholder}"]`);
});
// Cypress.Commands.add('findByPlaceholder', (placeholder, tag = 'input') => {
//   cy.get(`${tag}[placeholder="${placeholder}"]`);
// });

Cypress.Commands.add('login', (
  email = 'riot@qa.team',
  username = 'riot',
  password = '12345Qwert!'
) => {
  cy.request('POST', '/users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    const user = {
      id: response.body.user.id,
      username: response.body.user.username,
      email: response.body.user.email,
      bio: response.body.user.bio,
      image: response.body.user.image,
      token: response.body.user.token
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
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

Cypress.Commands.add('followUser', (username) => {
  return cy.request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('unfollowUser', (username) => {
  return cy.request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
    failOnStatusCode: false
  });
});
