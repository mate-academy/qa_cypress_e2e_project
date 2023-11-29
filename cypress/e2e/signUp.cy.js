/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");


describe('Sign Up page', () => {
  let user;
  before(() => {
cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });


  it('should provide an ability to register a new account', () => {
    const successfulRegistrationTitle = 'Welcome!';
    const successfulRegistrationText = 'Your registration was successful!';
    cy.intercept('POST', '/users')
      .as('registration');

    cy.visit('/#/');
    cy.getByDataCy('sign-up-link')
      .click();
    cy.getByDataCy('username-field')
      .type(user.username);
    cy.getByDataCy('email-field')
      .type(user.email);
    cy.getByDataCy('password-field')
      .type(user.password);
    cy.getByDataCy('sign-up-btn')
      .click();

    cy.wait('@registration');
    cy.get('.swal-title')
      .should('have.text', successfulRegistrationTitle);
    cy.get('.swal-text')
      .should('have.text', successfulRegistrationText);
  });

  it('should not allow registration with an email entered not in the format part@domain.top', () => {
    const unsuccessfulRegistrationTitle = 'Registration failed!';
    const unsuccessfulRegistrationText = 'Email must be a valid email. ';
    const randomNumber = Math.ceil(Math.random(1000) * 1000);
    const email = faker.name.firstName() + `${randomNumber}`;

    cy.visit('/#/');
    cy.getByDataCy('sign-up-link')
      .click();
    cy.getByDataCy('username-field')
      .type(user.username);
    cy.getByDataCy('email-field')
      .type(email);
    cy.getByDataCy('password-field')
      .type(user.password);
    cy.getByDataCy('sign-up-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', unsuccessfulRegistrationTitle);
    cy.get('.swal-text')
      .should('have.text', unsuccessfulRegistrationText);
  });

  it('should not allow to register with an empty Username field', () => {
    const unsuccessfulRegistrationTitle = 'Registration failed!';
    const unsuccessfulRegistrationText = 'Username field required. ';

    cy.visit('/#/');
    cy.getByDataCy('sign-up-link')
      .click();
    cy.getByDataCy('email-field')
      .type(user.email);
    cy.getByDataCy('password-field')
      .type(user.password);
    cy.getByDataCy('sign-up-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', unsuccessfulRegistrationTitle);
    cy.get('.swal-text')
      .should('have.text', unsuccessfulRegistrationText);
  });

  it('should not allow to register with an empty Email field', () => {
    const unsuccessfulRegistrationTitle = 'Registration failed!';
    const unsuccessfulRegistrationText = 'Email field required. ';

    cy.visit('/#/');
    cy.getByDataCy('sign-up-link')
      .click();
    cy.getByDataCy('username-field')
      .type(user.username);
    cy.getByDataCy('password-field')
      .type(user.password);
    cy.getByDataCy('sign-up-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', unsuccessfulRegistrationTitle);
    cy.get('.swal-text')
      .should('have.text', unsuccessfulRegistrationText);
  });

  it('should not allow to register with an empty Password field', () => {
    const unsuccessfulRegistrationTitle = 'Registration failed!';
    const unsuccessfulRegistrationText = 'Password field required. ';

    cy.visit('/#/');
    cy.getByDataCy('sign-up-link')
      .click();
    cy.getByDataCy('username-field')
      .type(user.username);
    cy.getByDataCy('email-field')
      .type(user.email);
    cy.getByDataCy('sign-up-btn')
      .click();

    cy.get('.swal-title')
      .should('have.text', unsuccessfulRegistrationTitle);
    cy.get('.swal-text')
      .should('have.text', unsuccessfulRegistrationText);
  });
});