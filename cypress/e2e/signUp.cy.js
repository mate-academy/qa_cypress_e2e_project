import { faker } from '@faker-js/faker';

describe('Sign up flow', () => {
  it('signs up with valid data', () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: '12345Qwert!',
    };

    cy.visit('/#/register');
    cy.get('input.form-control-lg[placeholder="Username"]').type(user.username);
    cy.get('input.form-control-lg[placeholder="Email"]').type(user.email);
    cy.get('input.form-control-lg[placeholder="Password"]').type(user.password);
    cy.get('button.btn.btn-lg.btn-primary').click();
    cy.get('button.swal-button').click();
    cy.get('[data-cy="username-link"]').should('contain', user.username);
  });

  it('shows error with empty form', () => {
    cy.visit('/#/register');
    cy.get('button.btn.btn-lg.btn-primary').click();
    cy.get('ul.error-messages').should('exist');
  });
});
