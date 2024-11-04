/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');
const randomNumber = Math.floor(Math.random().toString().slice(2, 6));
const user = {
  username: `${faker.internet.userName()}${randomNumber}`,
  email: faker.internet.email(),
  password: 'password123@'
};

const newUser = {
  username: `${faker.internet.userName()}${randomNumber}`,
  email: faker.internet.email(),
  password: 'password1234@'
};

describe('Sign Up page', () => {
  it('should sign up with valid data', () => {
    cy.visit('/user/register');
    cy.get('input[placeholder="Username"]').type(user.username);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.contains(user.username.toLowerCase()).should('be.visible');
  });

  it('should sign up without username', () => {
    cy.visit('/user/register');
    cy.get('input[placeholder="Email"]').type(newUser.email);
    cy.get('input[placeholder="Password"]').type(newUser.password);
    cy.get('button[type="submit"]').click();
    // eslint-disable-next-line max-len
    cy.contains('Username must start with a letter, have no spaces, and be 2 - 40 characters.').should('be.visible');
  });

  it('should sign up without email', () => {
    cy.visit('/user/register');
    cy.get('input[placeholder="Username"]').type(newUser.username);
    cy.get('input[placeholder="Password"]').type(newUser.password);
    cy.get('button[type="submit"]').click();
    // eslint-disable-next-line max-len
    cy.contains('This email does not seem valid.').should('be.visible');
  });

  it('should sign up without password', () => {
    cy.visit('/user/register');
    cy.get('input[placeholder="Username"]').type(newUser.username);
    cy.get('input[placeholder="Email"]').type(newUser.email);
    cy.get('button[type="submit"]').click();
    // eslint-disable-next-line max-len
    cy.contains(`can't be blank`).should('be.visible');
  });

  it('should not sign up with existing email', () => {
    cy.visit('/user/register');
    cy.get('input[placeholder="Username"]').type(newUser.username);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.contains('This email is taken.').should('be.visible');
  });

  it('should not sign up with existing username', () => {
    cy.visit('/user/register');
    cy.get('input[placeholder="Username"]').type(user.username);
    cy.get('input[placeholder="Email"]').type(newUser.email);
    cy.get('input[placeholder="Password"]').type(newUser.password);
    cy.get('button[type="submit"]').click();
    cy.contains('This username is taken.').should('be.visible');
  });
});
