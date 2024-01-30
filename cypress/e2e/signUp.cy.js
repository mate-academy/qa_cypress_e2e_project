/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should provide positive Sign Up', () => {
    cy.getByDataCy('SignUpButtonQA').click();
    cy.getByDataCy('UsernameQA').type(user.username);
    cy.getByDataCy('EmailQA').type(user.email);
    cy.getByDataCy('PasswordQA').type(user.password);
    cy.getByDataCy('RegisterButtonQA').click();
    cy.get('.swal-modal')
      .should('contain', 'Welcome!Your registration was successful!');
  });

  it('should not to provide Sign Up with all empty fields', () => {
    cy.getByDataCy('SignUpButtonQA').click();
    cy.getByDataCy('RegisterButtonQA').click();
    cy.get('.swal-modal')
      .should('contain', 'Registration failed!Username field required.');
    cy.get('.swal-button').click();
  });

  it('should not to provide Sign Up with Email and Password empty fields'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('UsernameQA').type(user.username);
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Email field required.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with Username and Password empty fields'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('EmailQA').type(user.email);
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Username field required.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with Username and Email empty fields'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('PasswordQA').type(user.password);
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Username field required.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with empty Username field'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('PasswordQA').type(user.password);
      cy.getByDataCy('EmailQA').type(user.email);
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Username field required.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with empty Email field'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('UsernameQA').type(user.username);
      cy.getByDataCy('PasswordQA').type(user.password);
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Email field required.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with empty Password field'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('UsernameQA').type(user.username);
      cy.getByDataCy('EmailQA').type(user.email);
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Password field required.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with non valid Email field'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('UsernameQA').type(user.username);
      cy.getByDataCy('PasswordQA').type(user.password);
      cy.getByDataCy('EmailQA').type('test' + 'mail.com');
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Email must be a valid email.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with Password with 7 characters'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('UsernameQA').type(user.username);
      cy.getByDataCy('EmailQA').type(user.email);
      cy.getByDataCy('PasswordQA').type('Rerter1');
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with Password without numbers'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('UsernameQA').type(user.username);
      cy.getByDataCy('EmailQA').type(user.email);
      cy.getByDataCy('PasswordQA').type('Rerterri');
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with Password without uppercase letters'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('UsernameQA').type(user.username);
      cy.getByDataCy('EmailQA').type(user.email);
      cy.getByDataCy('PasswordQA').type('rerterr1');
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
      cy.get('.swal-button').click();
    });

  it('should not to provide Sign Up with Password without lowercase letters'
    , () => {
      cy.getByDataCy('SignUpButtonQA').click();
      cy.getByDataCy('UsernameQA').type(user.username);
      cy.getByDataCy('EmailQA').type(user.email);
      cy.getByDataCy('PasswordQA').type('RERTERR1');
      cy.getByDataCy('RegisterButtonQA').click();
      cy.get('.swal-modal')
        .should('contain', 'Registration failed!Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
      cy.get('.swal-button').click();
    });
});
