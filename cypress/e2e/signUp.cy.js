/// <reference types='cypress' />
/// <reference types="../support" />

const { generateUser } = require("../support/generate");

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
  });

  it('should sign up with valid data', () => {
    const { username, email, password } = generateUser();

    cy.getByDataCy('username')
      .type(username);
    
    cy.getByDataCy('email')
      .type(email);
    
    cy.getByDataCy('password')
      .type(password)
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.getByDataCy('username-link')
      .should('contain', username);
  });

  it('should not sign up with empty username field', () => {
    const { email, password } = generateUser();
    
    cy.getByDataCy('email')
      .type(email);
    
    cy.getByDataCy('password')
      .type(password)
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Username field required.')
      .should('exist');
  });

  it('should not sign up with empty email field', () => {
    const { username, password } = generateUser();

    cy.getByDataCy('username')
      .type(username);

    cy.getByDataCy('password')
      .type(password)
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Email field required.')
      .should('exist');
  });

  it('should not sign up with empty password field', () => {
    const { username, email } = generateUser();

    cy.getByDataCy('username')
      .type(username);
    
    cy.getByDataCy('email')
      .type(email);
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Password field required.')
      .should('exist');
  });

  it('should not sign up without top domain of email', () => {
    const { username, password } = generateUser();

    cy.getByDataCy('username')
      .type(username);
    
    cy.getByDataCy('email')
      .type('qwerty@gmail');
    
    cy.getByDataCy('password')
      .type(password)
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Email must be a valid email.')
      .should('exist');
  });

  it('should not sign up without domain of email', () => {
    const { username, password } = generateUser();

    cy.getByDataCy('username')
      .type(username);
    
    cy.getByDataCy('email')
      .type('qwerty.com');
    
    cy.getByDataCy('password')
      .type(password)
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Email must be a valid email.')
      .should('exist');
  });

  it('should not sign up without name of email', () => {
    const { username, password } = generateUser();

    cy.getByDataCy('username')
      .type(username);
    
    cy.getByDataCy('email')
      .type('qwerty');
    
    cy.getByDataCy('password')
      .type(password)
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Email must be a valid email.')
      .should('exist');
  });

  it('should not sign up with less than 8 symbols password', () => {
    const { username, email } = generateUser();

    cy.getByDataCy('username')
      .type(username);
    
    cy.getByDataCy('email')
      .type(email);
    
    cy.getByDataCy('password')
      .type("Qwerty1")
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
      .should('exist');
  });

  it('should not sign up without at least 1 number in password', () => {
    const { username, email } = generateUser();

    cy.getByDataCy('username')
      .type(username);
    
    cy.getByDataCy('email')
      .type(email);
    
    cy.getByDataCy('password')
      .type("Qwertyui")
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
      .should('exist');
  });

  it('should not sign up without at least 1 uppercase letter in password', () => {
    const { username, email } = generateUser();

    cy.getByDataCy('username')
      .type(username);
    
    cy.getByDataCy('email')
      .type(email);
    
    cy.getByDataCy('password')
      .type("qwerty11")
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
      .should('exist');
  });

  it('should not sign up without at least 1 lowercase letter in password', () => {
    const { username, email } = generateUser();

    cy.getByDataCy('username')
      .type(username);
    
    cy.getByDataCy('email')
      .type(email);
    
    cy.getByDataCy('password')
      .type("QWERTY11")
    
    cy.getByDataCy('sign_up')
      .click();
    
    cy.contains('div', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
      .should('exist');
  });
});


