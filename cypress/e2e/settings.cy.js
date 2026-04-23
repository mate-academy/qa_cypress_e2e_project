/// <reference types='cypress' />
/// <reference types='../support' />

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((res) => { user = res; });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    cy.visit('/#/login');
    cy.get('[data-cy="email-sign-in"]').type(user.email);
    cy.get('[data-cy="password-sign-in"]').type(user.password);
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.get('a[href="#/settings"]').click();
  });

  it('should provide an ability to update username', () => {
    cy.get('input[placeholder="Your Name"]').clear();
    cy.get('input[placeholder="Your Name"]').type('NewUsername');
    cy.contains('button', 'Update Settings').click();
    cy.get('[data-cy="username-link"]').should('contain', 'NewUsername');
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'new bio';
    cy.get('textarea[placeholder="Short bio about you"]').clear();
    cy.get('textarea[placeholder="Short bio about you"]').type(newBio);
    cy.contains('button', 'Update Settings').click();
    cy.get('textarea[placeholder="Short bio about you"]')
      .should('have.value', newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = `new_${user.email}`;

    cy.get('input[placeholder="Email"]').clear();
    cy.get('input[placeholder="Email"]').type(newEmail);

    cy.contains('button', 'Update Settings').click();

    cy.get('input[placeholder="Email"]').should('have.value', newEmail);

    cy.get('[data-cy="username-link"]').should('contain', user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'newPassword123';

    cy.get('input[placeholder="Password"]').type(newPassword);

    cy.contains('button', 'Update Settings').click();
    cy.get('.error-messages').should('not.exist');
    cy.contains('button', 'Update Settings').should('be.visible');
  });

  it('should provide an ability to log out', () => {
    cy.contains('button', 'Or click here to logout').click();
    cy.get('.navbar').should('contain', 'Sign in');
    cy.url().should('eq', Cypress.config().baseUrl + '#/');
  });
});
