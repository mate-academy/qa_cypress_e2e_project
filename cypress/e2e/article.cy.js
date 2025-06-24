import { faker } from '@faker-js/faker';

describe('User Settings', () => {
  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '12345Qwert!'
  };

  const updated = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '98765Zxcv!',
    bio: faker.lorem.sentence()
  };

  before(() => {
    cy.visit('/#/register');
    cy.get('input[placeholder="Username"]').type(user.username);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('button:contains("Sign up")').click();
    cy.get('button.swal-button').click();
    cy.get('[data-cy="settings-link"]').click();
  });

  it('updates bio with success dialog', () => {
    cy.get('textarea[placeholder="Short bio about you"]').clear().type(updated.bio);
    cy.get('button:contains("Update Settings")').click();
    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('button.swal-button').click();
    cy.get('[data-cy="profile-bio"]').should('contain', updated.bio);
  });

  it('updates username, email, and password', () => {
    cy.get('input[placeholder="Username"]').clear().type(updated.username);
    cy.get('input[placeholder="Email"]').clear().type(updated.email);
    cy.get('input[placeholder="New Password"]').clear().type(updated.password);
    cy.get('button:contains("Update Settings")').click();
    cy.get('[data-cy="username-link"]').should('contain', updated.username);
  });
});
