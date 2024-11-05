/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.register();
    cy.login();
  });

  it('should be able to follow/unfollow the another user', () => {
    cy.visit('#/@riot');
    cy.get('class="btn btn-sm btn-outline-secondary action-btn"').click();

    cy.get('.btn').should('contain', 'Unfollow');

    cy.get('class="btn btn-sm btn-outline-secondary action-btn"').click();

    cy.get('.btn').should('contain', 'Follow');
  });
});
