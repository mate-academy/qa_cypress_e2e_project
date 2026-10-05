Cypress.Commands.add('getByDataQa', (selector) => {
  return cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email, username, password) => {
  return cy.request('POST', '/users', { email, username, password });
});

Cypress.Commands.add('login', (email, password) => {
  return cy.request('POST', '/users/login', {
    user: { email, password }
  }).then(({ body }) => {
    return cy.setCookie('drash_sess', body.user.token);
  });
});

Cypress.Commands.add('createArticle', (article, authorId) => {
  const { tag, ...fields } = article;
  return cy.request('POST', '/articles', {
    article: { ...fields, tags: tag, author_id: authorId }
  }).its('body.article');
});
