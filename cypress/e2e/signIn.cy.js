/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign In page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/login');
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.task('generateUser').then((generateUser) => {
      cy.createUserAndSignIn(generateUser);
      cy.getByDataCy('username-link').should('contain', generateUser.username);
    });
  });

  it('should not provide an ability to log in with the wrong password', () => {
    const wrongPass = 'Wrongpass123!';

    cy.task('generateUser').then((generateUser) => {
      cy.createUserAndSignIn(generateUser);
  
      cy.getByDataCy('profile-settings').click();
      cy.getByDataCy('logout-button').click();
      
      cy.visit('/#/login');
      cy.getByDataCy('email-sign-in').type(generateUser.email);
      cy.getByDataCy('password-sign-in').type(wrongPass);
      cy.getByDataCy('sign-in-btn').click();
      cy.get('.swal-modal').should('contain', 'Login failed!');
    });
  });
});
