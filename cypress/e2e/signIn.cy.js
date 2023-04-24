/// <reference types="cypress" />
// / <reference types="../support" />

// import SignInPageObject from '../support/pages/signIn.pageObject';
// import HomePageObject from '../support/pages/home.pageObject';

// const signInPage = new SignInPageObject();
// const homePage = new HomePageObject();

// describe('Sign In page', () => {
//   let user;

//   before(() => {
//     cy.task('db:clear');
//     cy.task('generateUser').then(generateUser => {
//       user = generateUser;
//     });
//   });

//   it('should provide an ability to log in with existing credentials', () => {

//     // cy.intercept('POST', '/users')
//     // .as('register');

//     // cy.register();

//     // cy.visit('/login')

//     signInPage.visit();
//     cy.register(user.email, user.username, user.password);

//     signInPage.emailField
//       .type(user.email);
//     signInPage.passwordField
//       .type(user.password);
//     signInPage.signInBtn
//       .click();

//     homePage.usernameLink
//       .should('contain', user.username);
//   });

//   it('should not provide an ability to log in with wrong credentials', () => {

//   });
// });

describe('Sign Up page', () => {
  let user;
  

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to log in with existing credentials', () => {

    let userEmail = 'riot@qa.team';
    let userPassword = '12345Qwert!';
    let userUsername = 'riot';

    cy.register().then(() => {
      cy.visit('/login')
    cy.getByDataCy('email-sign-in')
      .type(userEmail);
    cy.getByDataCy('password-sign-in')
      .type(userPassword);
    cy.getByDataCy('sign-in-btn')
      .click();
    
    cy.getByDataCy('username-link')
      .should('contain', userUsername);
    cy.url()
      .should('include', '/');
    })
  });

  it('should provide an ability to log in with existing credentials', () => {

    let userEmail = 'dhdkj@qa.team';
    let userPassword = '12345Qwert!';
    let userUsername = 'riot';

    cy.register().then(() => {
      cy.visit('/login')
    cy.getByDataCy('email-sign-in')
      .type(userEmail);
    cy.getByDataCy('password-sign-in')
      .type(userPassword);
    cy.getByDataCy('sign-in-btn')
      .click();

      cy.get('.swal-title')
      .should('have.text', 'Login failed!');
      cy.url()
      .should('include', '/login');
    })
  });
});
