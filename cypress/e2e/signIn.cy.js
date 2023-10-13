/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign In page', () => {

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/login');
  });

  it('should provide an ability to log in with existing credentials', () => {
    let user;

cy.task('generateUser').then((generateUser) => {
  user = generateUser;

  cy.request('POST', 'http://localhost:1668/users', {
    email: user.email,
    username: user.username,
    password: user.password
  });

  cy.getByDataCy('email-sign-in').type(user.email);
  cy.getByDataCy('password-sign-in').type(user.password);
  cy.getByDataCy('sign-in-btn').click();

  cy.getByDataCy('username-link').should('contain', user.username);
});
});

  it('should not provide an ability to log in with wrong password', () => {
    let user;

cy.task('generateUser').then((generateUser) => {
  user = generateUser;

  cy.request('POST', 'http://localhost:1668/users', {
    email: user.email,
    username: user.username,
    password: user.password
  });

  cy.getByDataCy('email-sign-in').type(user.email);
  cy.getByDataCy('password-sign-in').type('Wrongpass123!');
  cy.getByDataCy('sign-in-btn').click();

  cy.get('.swal-modal').should('contain', 'Login failed!');
});
});

  });

