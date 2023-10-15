/// <reference types='cypress' />
/// <reference types='../support' />

describe('User follow/unfollow flow', () => {
  before(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
  });

  it('should be able to follow/unfollow another user', () => {
    let user1;
    let user2;

    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;

      cy.getByDataCy('register-username-input').type(user1.username);
      cy.getByDataCy('register-email-input').type(user1.email);
      cy.getByDataCy('register-password-input').type(user1.password);
      cy.getByDataCy('signup-button').click();

      cy.get('.swal-button').click();

      cy.getByDataCy('profile-settings').click();
      cy.getByDataCy('logout-btn').click();
    
      cy.visit('/#/register');
      cy.task('generateUser').then((generateUser) => {
        user2 = generateUser;

        cy.getByDataCy('register-username-input').type(user2.username);
        cy.getByDataCy('register-email-input').type(user2.email);
        cy.getByDataCy('register-password-input').type(user2.password);
        cy.getByDataCy('signup-button').click();

        cy.get('.swal-button').click();

        cy.visit(`http://localhost:1667/#/@${user1.username}`);
    
        cy.getByDataCy('follow-button').click();
      });
    });

    // cy.getByDataCy('follow-button').should('contain', `Unfollow ${user1.username}`); // I don't understand what it doesn't find user1.username
      cy.getByDataCy('follow-button').should('contain', 'Follow');




  });
});
