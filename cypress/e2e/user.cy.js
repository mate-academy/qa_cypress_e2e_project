/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
const signInPage = new SignInPageObject();

describe('user page', () => {
  let user;
  let user1;
  let article;

  beforeEach(() => {
    signInPage.visit();
    cy.task('db:clear');
    cy.task('generateUser')
      .then((generateUser) => {
        user = generateUser;
      })
      .then(() => {
        cy.register(user.email, user.username, user.password);
      });

    cy.task('generateUser')
      .then((generateUser) => {
        user1 = generateUser;
      })
      .then(() => {
        cy.register(user1.email, user1.username, user1.password);
      })

      .then(() => {
        signInPage.visit();
        cy.logIn(user.email, user.password);
        cy.wait(2000);
      });          
});
//Bug
  it('should add to folowers', () => {
    
    signInPage.visit(`/#/@${user1.username}`);
    cy.get('.btn').click();
    cy.get('.btn').should('contain','Unfollow');
    
  });
});
