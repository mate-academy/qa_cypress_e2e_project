/// <reference types='cypress' />
/// <reference types='../support' />

/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  before(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to register with valid data', () => {
    cy.visit('#/register');
    cy.get('a.nav-link[href="#/register"]')
      .should('be.visible')
      .click();
    cy.get('input[placeholder="Username"].form-control.form-control-lg')
      .should('be.visible')
      .type(user.username);
    cy.get('input[placeholder="Email"].form-control.form-control-lg')
      .should('be.visible')
      .type(user.email);
    cy.get('input[placeholder="Password"].form-control.form-control-lg')
      .should('be.visible')
      .type(user.password);
    cy.get('button.btn.btn-lg.btn-primary.pull-xs-right')
      .contains('Sign up')
      .should('be.visible')
      .click();
    cy.get('.swal-title')
      .should('contain.text', 'Welcome!');
  });

  it('should not provide an ability to sign up in with invalid data - email',
    () => {
      cy.visit('#/register');
      cy.get('input[placeholder="Username"].form-control.form-control-lg')
        .should('be.visible')
        .type(user.username);
      cy.get('input[placeholder="Email"].form-control.form-control-lg')
        .should('be.visible')
        .type(user.username);
      cy.get('input[placeholder="Password"].form-control.form-control-lg')
        .should('be.visible')
        .type(user.password);
      cy.get('button.btn.btn-lg.btn-primary.pull-xs-right')
        .contains('Sign up')
        .should('be.visible')
        .click();
      cy.get('.swal-title').should('contain.text', 'Registration failed!');
    });
});
