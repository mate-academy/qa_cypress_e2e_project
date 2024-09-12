import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    }).then((response) => ({
      ...response.body.user,
      password
    }));
  });

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'users/login', {
    user
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('registerAndLoginUser', (email, username, password) => {
  cy.register(email, username, password).then((user) => {
    cy.login(user).then(() => user);
    cy.wrap(user).as('user');
  });
});

Cypress.Commands.add('assertPageUrl', (url) => {
  cy.hash().should('equal', '#' + url);
});

Cypress.Commands.add('createArticle', (article, articlePage) => {
  articlePage.visit();

  articlePage.typeTitle(article.title);
  articlePage.typeDescription(article.description);
  articlePage.typeBody(article.body);
  articlePage.typeTag(article.tag);
  articlePage.clickPublishBtn();

  cy.assertPageUrl(`/articles/${article.title}`);
});
