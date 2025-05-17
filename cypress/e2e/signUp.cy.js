import { faker } from '@faker-js/faker';

/// <reference types='cypress' />
/// <reference types='../support' />

 HEAD
describe('Sign in flow'), () => {
  const email = 'testuser@example.com';
  const password = 'Test1234!';
  const name = faker.person.firstName();
  it('should sign in with valid credentials'), () => {
    signInPage.visit();
    signInPage.fillEmail(email);
    signInPage.fillPassword(password);
    signInPage.submit();

    cy.contains('Your Feed').should('be.visible');

describe('Sign Up Test', () => {
  it('should register a new user', () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.visit('/signup');
    cy.get('[data-qa="email-input"]').type(email);
    cy.get('[data-qa="password-input"]').type(password);
    cy.get('[data-qa="submit-button"]').click();
  });
});

