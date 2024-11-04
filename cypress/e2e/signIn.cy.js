/// <reference types='cypress' />
/// <reference types='../support' />

const user = {
  username: 'wombat098',
  email: 'wombat098@i.ua',
  password: '1234567890'
};

describe('Sign In page', () => {
  it('should provide an ability to log in with existing credentials', () => {
    cy.visit('/user/login');
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.contains(user.username.toLowerCase()).should('be.visible');
  });

  it('should not provide an ability to log in without email', () => {
    cy.visit('/user/login');
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.contains(`can't be blank`).should('be.visible');
  });

  it('should not provide an ability to log in without password', () => {
    cy.visit('/user/login');
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('button[type="submit"]').click();
    cy.contains(`can't be blank`).should('be.visible');
  });

  it('should not provide an ability to log in with wrong email', () => {
    cy.visit('/user/login');
    cy.get('input[placeholder="Email"]').type('wrongEmail@i.ua');
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.contains('is invalid').should('be.visible');
  });

  it('should not provide an ability to log in with wrong password', () => {
    cy.visit('/user/login');
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type('wrongPassword');
    cy.get('button[type="submit"]').click();
    cy.contains('is invalid').should('be.visible');
  });
});
