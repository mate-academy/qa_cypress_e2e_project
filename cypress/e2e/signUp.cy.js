/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
  });

  const validUsername = 'testvalusername';
  const shortPassword = 'Test1';
  const withoutNumberPass = 'Testtest';
  const withoutUppLetPass = 'test1234';
  const withoutLowLetPass = 'TEST1234';

  const signUp = (user) => {
    cy.getByDataCy('register-username-input').type(user.username);
    cy.getByDataCy('register-email-input').type(user.email);
    cy.getByDataCy('register-password-input').type(user.password);
    cy.getByDataCy('signup-button').click();
  };

  it('should provide an ability to sign up with valid data', () => {
    cy.task('generateUser').then((user) => {
      signUp(user);

      cy.get('.swal-modal')
        .should('contain', 'Your registration was successful!');
      cy.get('.swal-button').click();

      cy.getByDataCy('username-link').should('contain', user.username);
    });
  });

  it('should not provide an ability to sign up with taking email', () => {
    cy.task('generateUser').then((user) => {
      cy.request('POST', 'http://localhost:1668/users', user);
      signUp({ username: validUsername, ...user });

      cy.get('.swal-modal')
        .should('contain', 'Email already taken.');
    });
  });

  it('should not provide an ability to sign up with a password shorter than 8 characters', () => {
    cy.task('generateUser').then((user) => {
      signUp({ ...user, password: shortPassword });

      cy.get('.swal-modal')
        .should('contain', 'Password must be 8 characters');
    });
  });

  it('should not provide an ability to sign up with a password without a number', () => {
    cy.task('generateUser').then((user) => {
      signUp({ ...user, password: withoutNumberPass });

      cy.get('.swal-modal')
        .should('contain', 'Password must be 8 characters');
    });
  });

  it('should not provide an ability to sign up with a password without a capital letter', () => {
    cy.task('generateUser').then((user) => {
      signUp({ ...user, password: withoutUppLetPass });

      cy.get('.swal-modal')
        .should('contain', 'Password must be 8 characters');
    });
  });

  it('should not provide an ability to sign up with a password without a small letter', () => {
    cy.task('generateUser').then((user) => {
      signUp({ ...user, password: withoutLowLetPass });

      cy.get('.swal-modal')
        .should('contain', 'Password must be 8 characters');
    });
  });
});

