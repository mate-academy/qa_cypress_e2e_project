/// <reference types='cypress' /> 
/// <reference types='../support' /> 
 
import {alertMessages} from '../support/pages/alertMessages.PageObject';
// import SignUpPageObject from '@pages/SignUpPageObject.js';
 import SignUpPageObject from '../support/pages/SignUpPageObject'; 
 
// import HomePageObject from 'faker/lib/locales/he/index.js'; 
 const signUpPage = new SignUpPageObject();
// const homePage = new HomePageObject(); 
 
describe('Sign Up page', () => { 
  let user; 
 
  beforeEach(() => { 
    cy.task('db:clear'); 
    cy.task('generateUser').then((generateUser) => { 
      user = generateUser; 
    }); 
  }); 
 
  it('should sign up with valid details', () => { 
    cy.visit('/#/register'); 
    signUpPage.fillUsername(user.username); 
    signUpPage.fillEmail(user.email); 
     signUpPage.fillPassword(user.password); 
     signUpPage.submit(); 
     cy.get('.swal-text').should('contain','Your registration was successful!')
     //signUpPage.assertModalContent();
    // // cy.url().should('include', '/home'); 
    // SignUpPageObject.assertModalContent(alertMessages().successfulMessage); 
    //  homePage.assertHeaderContainUsername(user.username); 
  }); 
 
  it('should show an error with empty username', () => { 
     cy.visit('/#/register');
     //signUpPage.fillUsername(''); 
    signUpPage.fillEmail(user.email); 
     signUpPage.fillPassword(user.password); 
     signUpPage.submit(); 
     cy.get('.swal-text').should('contain','Username field required.')
    // cy.get('[data-cy="username"]').type(); 
    // cy.get('[data-cy="email-signup"]').type('Test123@gmail.com'); 
    // cy.get('[data-cy="password-signup"]').type('Qwert123!@'); 
    // cy.get('[data-cy="signup-btn"]').click(); 
    // signUpPage.assertModalContent(alertMessages().emptyUsernameMessage); 
  }); 
 
  it('should show an error with empty email', () => { 
    cy.visit('/#/register');
    signUpPage.fillUsername(user.username); 
    //signUpPage.fillEmail(user.email); 
     signUpPage.fillPassword(user.password); 
     signUpPage.submit(); 
     cy.get('.swal-text').should('contain','Email field required.')
  }); 
 
  it('should show an error with empty password', () => { 
    cy.visit('/#/register'); 
    signUpPage.fillUsername(user.username); 
    signUpPage.fillEmail(user.email); 
     //signUpPage.fillPassword(user.password); 
     signUpPage.submit(); 
     cy.get('.swal-text').should('contain','Password field required.')
  }); 
 
  it('should show an error with invalid email value', () => { 
    cy.visit('/#/register'); 
    signUpPage.fillUsername(user.username); 
    signUpPage.fillInvalidEmail(); 
     signUpPage.fillPassword(user.password); 
     signUpPage.submit(); 
     cy.get('.swal-text').should('contain','Email must be a valid email.')
  }); 
});
