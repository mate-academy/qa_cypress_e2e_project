/// <reference types='cypress' />

/// <reference types="../support" />
const {generateNewUser} = require('../support/generateNewUser');

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('#/register')
  });

  it(`The page contains title 'Sign up'`, () => {
    cy.get('h1').should('contain.text', 'Sign up');
  });

  it(`The Sign up page should contain 'Have an account' link`, () => {
    cy.contains('a', 'Have an account').should('exist');
  });

  it(`The user can register with valid data`, () => {
    const {username, email, password} = generateNewUser();

    cy.findByPlaceholder('Username').type(username);
    cy.findByPlaceholder('Email').type(email);
    cy.findByPlaceholder('Password').type(password);
    cy.contains('button', 'Sign up').click();
    cy.contains('.swal-modal', 'Your registration was successful!')
      .should('exist');
  });

  it(`The user can't register without username`, () => {
    const {username, email, password} = generateNewUser();

    cy.findByPlaceholder('Email').type(email);
    cy.findByPlaceholder('Password').type(password);
    cy.contains('button', 'Sign up').click();
    cy.contains('.swal-modal', 'Username field required.')
      .should('exist');
  });

  it(`The user can't register without email`, () => {
    const {username, email, password} = generateNewUser();

    cy.findByPlaceholder('Username').type(username);
    cy.findByPlaceholder('Password').type(password);
    cy.contains('button', 'Sign up').click();
    cy.contains('.swal-modal', 'Email field required.')
      .should('exist');
  });

  it(`The user can't register without password`, () => {
    const {username, email, password} = generateNewUser();

    cy.findByPlaceholder('Username').type(username);
    cy.findByPlaceholder('Email').type(email);
    cy.contains('button', 'Sign up').click();
    cy.contains('.swal-modal', 'Password field required.')
      .should('exist');
  });

  it(`The user can't register with existing email`, () => {
    const {username, email, password} = generateNewUser();

    cy.request('POST', 'users', {
      username, 
      email, 
      password
    });

    cy.findByPlaceholder('Username').type(`${username}new`);
    cy.findByPlaceholder('Email').type(email);
    cy.findByPlaceholder('Password').type(password);
    cy.contains('button', 'Sign up').click();
    cy.contains('.swal-modal', 'Email already taken.').should('exist');
  });
});
