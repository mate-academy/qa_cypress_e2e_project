/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  before(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
  });

  it('should be able to follow another user', () => {
    cy.registerAndFollowUsers();
  });
});
