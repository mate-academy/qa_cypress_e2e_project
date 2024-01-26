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
    cy.getByDataCy('Username').type(user.username);
    cy.getByDataCy('Email').type(user.email);
    cy.getByDataCy('Password').type(user.password);
    cy.getByDataCy('RegisterBTN').click();
    cy.get('.swal-title').should('contain.text', 'Welcome!');
  });

  it('should not provide an ability to sign up in with invalid credentials',
    () => {
      cy.visit('/#/register');
      cy.getByDataCy('Username').type(user.username);
      cy.getByDataCy('Email').type(user.username);
      cy.getByDataCy('Password').type(user.username);
      cy.getByDataCy('RegisterBTN').click();
      cy.get('.swal-title').should('contain.text', 'Registration failed!');
    });
});
