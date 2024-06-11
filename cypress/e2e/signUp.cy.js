/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.intercept('GET', '/register').as('registerPage');
    cy.visit('#/register');

  });

  it('should register the user with valid credentials', () => {
    cy.get('h1').should('contain.text', 'Sign up');
    
    const username = faker.name.firstName() + Math.ceil(Math.random() * 1000);
    const email = 'test' + Math.ceil(Math.random() * 1000) + '@mail.com';
    const password = '12345Qwert!';
    
    cy.get('[placeholder="Username"]').type(username);
    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Password"]').type(password);

    cy.get('.btn-primary').click({ force: true });
    
    cy.url().should('eq', 'http://localhost:1667/#/');

    cy.get('.swal-modal').should('be.visible').within(() => {
      cy.get('.swal-title').should('contain.text', 'Welcome!');
      cy.get('.swal-text').should('contain.text', 'Your registration was successful!');
      cy.get('.swal-button--confirm').click();
    });
  });
});


describe('Sign Up page', () => {
  before(() => {
    cy.visit('#/register')

  });
it('should not register the user with invalid email', () => {
  cy.get('h1').should('contain.text', 'Sign up');

  const username = "poiuy123";
  cy.get('[placeholder="Username"]').type(username);
  const email = "poiuy2124gamil.com";
  cy.get('[placeholder="Email"]').type(email);
  const password = "Mnbv!mnbv1"
  cy.get('[placeholder="Password"]').type(password);

  cy.get('.btn-primary').click({ force: true });

  cy.get('.swal-modal').should('be.visible').within(() => {
    cy.get('.swal-title').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', 'Email must be a valid email.');
    cy.get('.swal-button--confirm').click();
  });
});
});

it('should not register the user with only numbers in the password field', () => {
  cy.visit('#/register'); 
  cy.get('h1').should('contain.text', 'Sign up');

  const username = "poiuy123";
  cy.get('[placeholder="Username"]').type(username);
  const email = 'test' + Math.ceil(Math.random() * 1000) + '@mail.com';
  cy.get('[placeholder="Email"]').type(email);
  const password = "1"
  cy.get('[placeholder="Password"]').type(password);

  cy.get('.btn-primary').click({ force: true });

  cy.get('.swal-modal').should('be.visible').within(() => {
    cy.get('.swal-title').should('contain.text', 'Registration failed!');
    cy.get('.swal-text').should('contain.text', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    cy.get('.swal-button--confirm').click();
  });
});

