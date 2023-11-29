/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  let user;
  let followUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateFollowUser').then((generateFollowUser) => {
      followUser = generateFollowUser;
    });
  });
    
  it('should be able to follow the another user', () => {
    cy.login(user.email, user.username, user.password);
    cy.registerFollowUser(followUser.email, followUser.username, followUser.password);
    cy.visit(`/#/@${user.username}`);

    cy.getByDataCy('follow-btn')
      .should('exist');
    cy.getByDataCy('follow-btn')
      .click(); //button isn't clickable
  });

  it('should be able to unfollow the another user', () => {
     cy.login(user.email, user.username, user.password);
     cy.registerFollowUser(followUser.email, followUser.username, followUser.password);
     cy.visit(`/#/@${user.username}`);

     cy.getByDataCy('follow-btn')
      .should('exist');
     cy.getByDataCy('follow-btn')
      .click();
     cy.getByDataCy('unfollow-btn')
      .should('exist'); //there is no such a button
  });
});