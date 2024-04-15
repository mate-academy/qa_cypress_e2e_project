/// <reference types="cypress" />
/// <reference types="../support" />

describe('Sign Up page', () => {
  let user;
  const randomNumber = Math.floor(Math.random(1000) * 1000);
  // eslint-disable-next-line max-len
  const randomSymbol = () => String.fromCharCode(97 + Math.floor(Math.random() * 26));
  const shortUsername = randomSymbol() + randomSymbol();
  const longUsername = 'aleksandernowakowskialeksandernowakowskia';

  beforeEach(() => {
    cy.visit('/');
    cy.task('db:clear');
    cy.task('generateUser').then((newUser) => {
      user=newUser;
    });

  });

  it('should provide an ability to sign up with valid data', () => {
    cy.visit('/user/register');
    cy.getByDataCy('signUpText').should('contain.text', 'Sign up');
    cy.getByDataCy('username-sign-in').type(user.username);
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    cy.getByDataCy('profile-link').should('contain.text', user.username);
  });

  it('should not provide the ability to sign up with an empty username', () => {
    cy.visit('/user/register');
    cy.getByDataCy('signUpText').should('contain.text', 'Sign up');
    cy.getByDataCy('username-sign-in').clear();
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    // eslint-disable-next-line max-len
    cy.getByDataCy('errorMessage').should('contain.text','Username must start with a letter, have no spaces, and be 3 - 40 characters.');
  });

  // eslint-disable-next-line max-len
  it('should not provide the ability to sign up using a username starting with a number', () => {
    cy.visit('/user/register');
    cy.getByDataCy('signUpText').should('contain.text', 'Sign up');
    cy.getByDataCy('username-sign-in').type(randomNumber + user.username);
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    // eslint-disable-next-line max-len
    cy.getByDataCy('errorMessage').should('contain.text','Username must start with a letter, have no spaces, and be 3 - 40 characters.');
  });

  // eslint-disable-next-line max-len
  it('should not provide the ability to sign up using a username <3 letters', () => {
    cy.visit('/user/register');
    cy.getByDataCy('signUpText').should('contain.text', 'Sign up');
    cy.getByDataCy('username-sign-in').type(shortUsername);
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    // eslint-disable-next-line max-len
    cy.getByDataCy('errorMessage').should('contain.text','Username must start with a letter, have no spaces, and be 3 - 40 characters.');
  });

   // eslint-disable-next-line max-len
   it('should not provide the ability to sign up using a username >40 letters', () => {
    cy.visit('/user/register');
    cy.getByDataCy('signUpText').should('contain.text', 'Sign up');
    cy.getByDataCy('username-sign-in').type(longUsername);
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    // eslint-disable-next-line max-len
    cy.getByDataCy('errorMessage').should('contain.text','Username must start with a letter, have no spaces, and be 3 - 40 characters.');
  });

  // eslint-disable-next-line max-len
  it('should not provide the ability to sign up using a username with spaces', () => {
    cy.visit('/user/register');
    cy.getByDataCy('signUpText').should('contain.text', 'Sign up');
    cy.getByDataCy('username-sign-in')
      .type(user.username + ' ' + user.username);
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    // eslint-disable-next-line max-len
    cy.getByDataCy('errorMessage').should('contain.text','Username must start with a letter, have no spaces, and be 3 - 40 characters.');
  });

  it('should not provide the ability to sign up with an empty email', () => {
    cy.visit('/user/register');
    cy.getByDataCy('signUpText').should('contain.text', 'Sign up');
    cy.getByDataCy('username-sign-in').type(user.username);
    cy.getByDataCy('email-sign-in').clear();
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    // eslint-disable-next-line max-len
    cy.getByDataCy('errorMessage').should('contain.text','This email does not seem valid.');
  });

  // eslint-disable-next-line max-len
  it('should not provide the ability to sign up without @ in the email address', () => {
    cy.visit('/user/register');
    cy.getByDataCy('signUpText').should('contain.text', 'Sign up');
    cy.getByDataCy('username-sign-in').type(user.username);
    cy.getByDataCy('email-sign-in').type(`${user.username}.com`);
    cy.getByDataCy('password-sign-in').type(user.password);
    cy.getByDataCy('sign-in-btn').click();
    cy.url().should('contain','/user/register');
  });

  it('should not provide the ability to sign up with an empty password', () => {
    cy.visit('/user/register');
    cy.getByDataCy('signUpText').should('contain.text', 'Sign up');
    cy.getByDataCy('username-sign-in').type(user.username);
    cy.getByDataCy('email-sign-in').type(user.email);
    cy.getByDataCy('password-sign-in').clear();
    cy.getByDataCy('sign-in-btn').click();
    cy.getByDataCy('errorMessage').should('contain.text','be blank');
  });

});
