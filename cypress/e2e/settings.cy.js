/// <reference types='cypress' />
/// <reference types='../support' />

describe('Settings page', () => {
  before(() => {});

  beforeEach(() => {});

  it('should provide an ability to update username', () => {
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);

      cy.visit('/#/login');
      cy.get('[data-cy="email-sign-in"]').type(user.email);
      cy.get('[data-cy="password-sign-in"]').type(user.password);
      cy.get('[data-cy="sign-in-btn"]').click();

      cy.get('[data-cy="username-link"]', { timeout: 10000 }).should(
        'contain',
        user.username
      );

      cy.contains('a', 'Settings').click();

      const updatedUsername = `${user.username}Updated`;

      cy.get('input[placeholder="Your username"]').clear();

      cy.get('input[placeholder="Your username"]').type(updatedUsername);

      cy.contains('button', 'Update Settings').click();

      cy.get('.swal-title', { timeout: 10000 }).should(
        'contain.text',
        'Update successful!'
      );

      cy.get('[data-cy="username-link"]').should('contain', updatedUsername);
    });
  });

  it('should provide an ability to update bio', () => {
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);

      cy.visit('/#/login');
      cy.get('[data-cy="email-sign-in"]').type(user.email);
      cy.get('[data-cy="password-sign-in"]').type(user.password);
      cy.get('[data-cy="sign-in-btn"]').click();

      cy.get('[data-cy="username-link"]', { timeout: 10000 }).should(
        'contain',
        user.username
      );

      cy.contains('a', 'Settings').click();

      const updatedBio = 'This is my updated bio from Cypress.';

      cy.get('textarea[placeholder="Short bio about you"]').clear();

      cy.get('textarea[placeholder="Short bio about you"]').type(updatedBio);

      cy.contains('button', 'Update Settings').click();

      cy.get('.swal-title', { timeout: 10000 }).should(
        'contain.text',
        'Update successful!'
      );

      cy.get('.swal-button--confirm').click();

      cy.contains('a', 'Settings').click();

      cy.get('textarea[placeholder="Short bio about you"]').should(
        'have.value',
        updatedBio
      );
    });
  });

  it('should provide an ability to update an email', () => {});

  it('should provide an ability to update password', () => {});

  it('should provide an ability to log out', () => {});
});
