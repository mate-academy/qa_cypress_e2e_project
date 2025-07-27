/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  let user1, user2;

  before(() => {
    return cy.task('db:clear')
      .then(() => cy.task('generateUser'))
      .then((u1) => {
        user1 = u1;
        return cy.register(user1.email, user1.username, user1.password);
      })
      .then(() => cy.task('generateUser'))
      .then((u2) => {
        user2 = u2;
        return cy.register(user2.email, user2.username, user2.password);
      });
  });

  it('should be able to follow the another user', () => {
    cy.login(user1.email, user1.password);
    cy.visit(`/#/@${user2.username}`);
    cy.get('[data-qa="follow-btn"]').click();
    cy.get('[data-qa="follow-btn"]').should('contain', 'Unfollow');
  });
});
