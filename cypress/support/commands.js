Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('getByDataQa', (selector) => {
  return cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add(
  'register',
  (
    email = 'riot@qa.team',
    username = 'riot',
    password = '12345Qwert!'
  ) => {
    return cy.request('POST', '/users', {
      email,
      username,
      password
    }).then((response) => response.body.user);
  }
);

Cypress.Commands.add('login', (email, password) => {
  return cy.request('POST', '/users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    return cy.setCookie('drash_sess', response.body.user.token)
      .then(() => response.body.user);
  });
});

Cypress.Commands.add('createArticle', (article, authorId) => {
  return cy.request('POST', '/articles', {
    article: {
      ...article,
      author_id: authorId
    }
  }).then((response) => response.body.article);
});
