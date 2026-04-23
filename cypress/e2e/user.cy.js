/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  let user;
  let author;

  before(() => {
    cy.task('generateUser').then((res) => {
      user = res;
    });
    cy.task('generateUser').then((res) => {
      author = res;
    });
  });
  beforeEach(() => {
    cy.task('db:clear');

    cy.register(author.email, author.username, author.password);
    cy.register(user.email, user.username, user.password);

    cy.visit('/#/login');
    cy.get('[data-cy="email-sign-in"]').type(user.email);
    cy.get('[data-cy="password-sign-in"]').type(user.password);
    cy.get('[data-cy="sign-in-btn"]').click();

    cy.get('[data-cy="username-link"]').should('contain', user.username);
  });

  it('should be able to follow the another user', () => {
    cy.visit(`/#/profile/${author.username}`);

    cy.contains('button', `Follow ${author.username}`)
      .should('be.visible')
      .click();

    cy.contains('button', `Unfollow ${author.username}`)
      .should('be.visible');

    cy.get('[data-cy="username-link"]').click();
    cy.contains('a', 'My Articles').should('be.visible');
  });
});
