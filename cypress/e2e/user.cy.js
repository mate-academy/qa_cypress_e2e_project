import { faker } from '@faker-js/faker';

describe('Authentication and following', () => {
  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '12345Qwert!'
  };

  before(() => {
    cy.visit('/#/register');
    cy.get('input[placeholder="Username"]').type(user.username);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button:contains("Sign up")').click();
    cy.get('button.swal-button').click();
    cy.get('[data-qa="nav-logout"]').click();
  });

  it('logs in successfully', () => {
    cy.visit('/#/login');
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button:contains("Sign in")').click();
    cy.get('[data-qa="username-link"]').should('contain', user.username);
  });

  it('shows error with wrong credentials', () => {
    cy.visit('/#/login');
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type('wrongpass');
    cy.get('button:contains("Sign in")').click();
    cy.get('ul.error-messages').should('exist');
  });

  it('follows and unfollows another user', () => {
    const otherUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: '12345Abcd!'
    };

    cy.visit('/#/register');
    cy.get('input[placeholder="Username"]').type(otherUser.username);
    cy.get('input[placeholder="Email"]').type(otherUser.email);
    cy.get('input[placeholder="Password"]').type(otherUser.password);
    cy.get('button:contains("Sign up")').click();
    cy.get('button.swal-button').click();
    cy.get('[data-qa="nav-logout"]').click();

    cy.visit('/#/login');
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button:contains("Sign in")').click();

    cy.visit(`/#/profile/${otherUser.username}`);
    cy.get('button:contains("Follow")').click().should('contain', 'Unfollow');
    cy.get('button:contains("Unfollow")').click().should('contain', 'Follow');
  });
});
