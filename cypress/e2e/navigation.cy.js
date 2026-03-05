import HeaderPage from '../support/pages/HeaderPage.js';

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/#/');
  });

  it('should navigate to Sign In page from Home page via header link', () => {
    HeaderPage.clickSignInLink();
    cy.url().should('include', '/login');
  });

  it('should navigate to Sign Up page from Home page via header link', () => {
    HeaderPage.clickSignUpLink();
    cy.url().should('include', '/register');
  });

  it('should navigate to Home page via Conduit logo', () => {
    HeaderPage.clickSignInLink();
    cy.url().should('include', '/login');

    HeaderPage.clickHomeLogo();
    cy.url().should('include', '/#/');
  });
});
