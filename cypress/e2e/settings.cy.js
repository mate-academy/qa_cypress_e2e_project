/// <reference types='cypress' />
/// <reference types='../support' />

describe('Settings page', () => {
  before(() => {

  });

  beforeEach(() => {

  });

  it('should update bio', () => {
    cy.get('[data-qa="bio"]').clear().type(faker.lorem.sentence());
    cy.get('[data-qa="save-profile"]').click();
    cy.reload();
    cy.get('[data-qa="bio"]').should('contain', faker.lorem.sentence());
  });

  it('should update username', () => {
    const newUsername = faker.internet.userName();
    cy.get('[data-qa="username"]').clear().type(newUsername);
    cy.get('[data-qa="save-profile"]').click();
    cy.reload();
    cy.get('[data-qa="username"]').should('have.value', newUsername);
  });

  it('should update email', () => {
    const newEmail = faker.internet.email();
    cy.get('[data-qa="email"]').clear().type(newEmail);
    cy.get('[data-qa="save-profile"]').click();
    cy.reload();
    cy.get('[data-qa="email"]').should('have.value', newEmail);
  });

  it('should update password', () => {
    cy.get('[data-qa="password"]').type('newpassword123');
    cy.get('[data-qa="save-profile"]').click();
    cy.logout();
    cy.login('user@example.com', 'newpassword123');
    cy.url().should('eq', '/');
  });
});