/// <reference types='cypress' />
/// <reference types='../support' />

const SignInPageObject = require('../support/pages/signIn.pageObject');
const HomePageObject = require('../support/pages/home.pageObject');
const faker = require('faker');

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    const wrongEmail = 'ababahalamaha@gmail.com';
    const wrongPassword = '11111111';
  
    cy.visit('#/login');
  
    cy.get('[placeholder="Email"]').type(wrongEmail);
    cy.get('[placeholder="Password"]').type(wrongPassword);
    cy.get('.btn-primary').click();
  
  
    cy.get('.swal-modal').should('be.visible').within(() => {
      cy.get('.swal-title').should('contain.text', 'Login failed!');
      cy.get('.swal-text').should('contain.text', 'Invalid user credentials.');
      cy.get('.swal-button--confirm').click();
    });
  
    cy.url().should('include', '/login');
  });
  
});
