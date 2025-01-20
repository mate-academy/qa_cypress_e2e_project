import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('getByClass', (selector) => {
  cy.get(`.${selector}`);
});

Cypress.Commands.add('getByPlaceholder', (placeholder) => {
  cy.get(`[placeholder=${placeholder}]`);
});

Cypress.Commands.add(
  'register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    });
  }
);

Cypress.Commands.add(
  'login',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
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
  }
);

Cypress.Commands.add('createArticle', (title, description, body) => {
  cy.getCookie('drash_sess')
    .should('exist')
    .then((token) => {
      const authToken = token.value;

      cy.request({
        method: 'POST',
        url: '/articles',
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
