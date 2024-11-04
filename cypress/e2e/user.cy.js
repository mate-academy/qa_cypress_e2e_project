/// <reference types='cypress' />
/// <reference types='../support' />

const user = {
  username: 'wombat098',
  email: 'wombat098@i.ua',
  password: '1234567890'
};

describe('User', () => {
  beforeEach(() => {
    cy.login(user);
    cy.visit('');
  });

  it('should be able to follow the another user', () => {
    cy.contains('Global Feed').click();
    cy.contains('Article title:').click();
    cy.contains('Follow').click();
    cy.contains('Unfollow').should('be.visible');
    cy.contains('Unfollow').click();
    cy.contains('Follow').should('be.visible');
  });
});
