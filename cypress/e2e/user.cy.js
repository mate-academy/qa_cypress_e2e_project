/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from "../support/pages/profile.pageObject";

const profilePage = new ProfilePageObject;

describe('User', () => {
  let user1;
  let user2;
  // before(() => {

  // });
  beforeEach(() => {
    cy.task('db:clear');    
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
    });           
  });
  beforeEach(() => {
    cy.register(user1.email, user1.username, user1.password);
    cy.register(user2.email, user2.username, user2.password);
    
    cy.login(user2.email, user2.username, user2.password);
  })


  it('should be able to follow the another user', () => {
    cy.visit(`#/@${user1.username}`);
    profilePage.clickFollowButton();
    profilePage.assertFollowUser().should((response) => {
      expect(response).to.have.property('follow')
    });
    

  });
});
