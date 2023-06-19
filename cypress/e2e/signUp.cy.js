/// <reference types="cypress" />

import { generateNewUser } from '../support/generateNewUser';

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('#/register');
  });

  it('User is able to sign up with valid dataa', () => {
    const { username, email, password } = generateNewUser();
    cy.get('[data-qa="username-sign-up"]').type(username);
    cy.get('[data-qa="email-sign-up"]').type(email);
    cy.get('[data-qa="password-sign-up"]').type(password);
    cy.get('[data-qa="sign-up-btn"]').click();
    cy.contains('.swal-modal', 'Your registration was successful!')
      .should('exist');
  });

  it('User is not able to sign up without username', () => {
    const { email, password } = generateNewUser();

    cy.get('[data-qa="email-sign-up"]').type(email);
    cy.get('[data-qa="password-sign-up"]').type(password);
    cy.get('[data-qa="sign-up-btn"]').click();
    cy.contains('.swal-modal', 'Username field required.')
      .should('exist');
  });

  it('User is not able to sign up without email', () => {
    const { username, password } = generateNewUser();

    cy.get('[data-qa="username-sign-up"]').type(username);
    cy.get('[data-qa="password-sign-up"]').type(password);
    cy.get('[data-qa="sign-up-btn"]').click();
    cy.contains('.swal-modal', 'Email field required.')
      .should('exist');
  });

  it('User is not able to sign up without password', () => {
    const { username, email } = generateNewUser();

    cy.get('[data-qa="username-sign-up"]').type(username);
    cy.get('[data-qa="email-sign-up"]').type(email);
    cy.get('[data-qa="sign-up-btn"]').click();
    cy.contains('.swal-modal', 'Password field required.')
      .should('exist');
  });

  it('User is not able to sign up with existing email', () => {
    const { username, email, password } = generateNewUser();

    cy.request('POST', 'users', {
      username,
      email,
      password
    });

    cy.get('[data-qa="username-sign-up"]').type(`${username}new`);
    cy.get('[data-qa="email-sign-up"]').type(email);
    cy.get('[data-qa="password-sign-up"]').type(password);
    cy.get('[data-qa="sign-up-btn"]').click();
    cy.contains('.swal-modal', 'Email already taken.').should('exist');
  });
});
