/// <reference types="cypress" />

describe('Tags Tests', () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('displays articles by tag', () => {
    cy.createUser().then((user) => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('form').submit();

      cy.fakeArticle().then((article) => {
        cy.request('POST', 'http://localhost:3000/api/articles', { article, userEmail: user.email });

        const tag = article.tags[0];
        cy.visit('/tag/' + encodeURIComponent(tag));
        cy.contains(article.title);
      });
    });
  });
});
