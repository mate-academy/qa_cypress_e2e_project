/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {
  let user; 

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with existing credentials', () => {
    cy.visit('/#/register');
    cy.getByDataQa('Username').type(user.username);
    cy.getByDataQa('Email').type(user.email);
    cy.getByDataQa('Password').type(user.password);
    cy.getByDataQa('RegisterButton').click();
    cy.get('.swal-title').should('contain.text', 'Welcome!');
  });

  it('should not provide an ability to sign up in with invalid credentials',
    () => {
      cy.visit('/#/register');
      cy.getByDataQa('Username').type(user.username);
      cy.getByDataQa('Email').type(user.username);
      cy.getByDataQa('Password').type(user.username);
      cy.getByDataQa('RegisterButton').click();
      cy.get('.swal-title').should('contain.text', 'Registration failed!');
    });
});