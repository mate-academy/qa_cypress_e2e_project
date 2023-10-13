/// <reference types='cypress' />
/// <reference types='../support' />
// import variable
import {
  randomEmail,
  randomUsername,
  randomPassword,
  invalidShortPassword,
  invalidNoNumberPassword,
  invalidNoUppercasePassword,
  invalidNoLowercasePassword,
  invalidEmail
} from './../support/testData.js';


describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('/#/register');
    // allies for fields 
    cy.get('input[placeholder="Username"]').as('usernameField');
    cy.get('input[placeholder="Email"]').as('emailField');
    cy.get('input[placeholder="Password"]').as('passwordField');
    // allies for buttons 
    cy.get('button.btn-primary').as('nextButton');
  });


  it('should not allow registration', () => {
    // all empty
    cy.get('@nextButton').click();
    // late allies
    cy.get('.swal-button').as('okButton');
    cy.get('.swal-title').as('alertTitle');
    cy.get('.swal-text').as('alert')

    cy.get('@alertTitle').should('have.text', 'Registration failed!');
    cy.get('@okButton').click();
    //empty password
    cy.get('@emailField').type(randomEmail);
    cy.get('@usernameField').type(randomUsername);
    cy.get('@nextButton').click();
    cy.get('@alertTitle').should('have.text', 'Registration failed!');
    cy.get('@okButton').click();
    // empty username
    cy.get('@emailField').type(randomEmail);
    cy.get('@passwordField').type(randomPassword);
    cy.get('@nextButton').click();
    cy.get('@alertTitle').should('have.text', 'Registration failed!');
    cy.get('@okButton').click();
    //empty email
    cy.get('@usernameField').type(randomUsername);
    cy.get('@passwordField').type(randomPassword);
    cy.get('@nextButton').click();
    cy.get('@alertTitle').should('have.text', 'Registration failed!');
    cy.get('@okButton').click();
    // check non valid email
    cy.get('@emailField').type(invalidEmail);
    cy.get('@usernameField').type(randomUsername);
    cy.get('@passwordField').type(randomPassword);
    cy.get('@nextButton').click();
    cy.get('@alert').should('have.text', 'Email must be a valid email. ');
    cy.get('@okButton').click();
    // check no lower case password
    cy.get('@emailField').type(randomEmail);
    cy.get('@usernameField').type(randomUsername);
    cy.get('@passwordField').type(invalidNoLowercasePassword);
    cy.get('@nextButton').click();
    cy.get('@alert').invoke('text').should('include', 'Password must be');
    cy.get('@okButton').click();
    // check no number password  

    cy.get('@emailField').type(randomEmail);
    cy.get('@usernameField').type(randomUsername);
    cy.get('@passwordField').type(invalidNoNumberPassword);
    cy.get('@nextButton').click();
    cy.get('@alert').invoke('text').should('include', 'Password must be');
    cy.get('@okButton').click();
    // check no uppercase password
    cy.get('@emailField').type(randomEmail);
    cy.get('@usernameField').type(randomUsername);
    cy.get('@passwordField').type(invalidNoUppercasePassword);
    cy.get('@nextButton').click();
    cy.get('@alert').invoke('text').should('include', 'Password must be');
    cy.get('@okButton').click();
    // check short password
    cy.get('@emailField').type(randomEmail);
    cy.get('@usernameField').type(randomUsername);
    cy.get('@passwordField').type(invalidShortPassword);
    cy.get('@nextButton').click();
    cy.get('@alert').invoke('text').should('include', 'Password must be');
    cy.get('@okButton').click();
  });
  
  it('should allow registration', () => {
    cy.get('@emailField').type(randomEmail);
    cy.get('@usernameField').type(randomUsername);
    cy.get('@passwordField').type(randomPassword);
    cy.get('@nextButton').click();
    cy.wait(2000);
    cy.get('.swal-title').should('have.text', 'Welcome!');
  });
});