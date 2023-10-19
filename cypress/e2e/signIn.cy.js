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

  cy.request('POST', 'http://localhost:1667/users', {
    email: user.email,
    username: user.username,
    password: user.password
  });

  cy.getByDataCy('login-email-input').type(user.email);
  cy.getByDataCy('login-password-input').type(user.password);
  cy.getByDataCy('signin-button').click();

  cy.getByDataCy('navbar-username').should('contain', user.username);
});
});

  it('should not provide an ability to log in with wrong password', () => {
    let user;

cy.task('generateUser').then((generateUser) => {
  user = generateUser;

  cy.request('POST', 'http://localhost:1667/users', {
    email: user.email,
    username: user.username,
    password: user.password
  });

  cy.getByDataCy('login-email-input').type(user.email);
  cy.getByDataCy('login-password-input').type('Wrongpass123!');
  cy.getByDataCy('signin-button').click();

  cy.get('.swal-modal').should('contain', 'Login failed!');
});
});

  });
