/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let followUser;

  before(() => {

  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      followUser = generateUser;
      cy.register(
        followUser.email, followUser.username, followUser.password).then(() => {
      });
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.password);
      });
    });
  });

  it.only('should be able to follow the another user', () => {
    cy.visit('/#/@' + followUser.username);
    userPage.clickFollow();
    cy.get('button').should('include.text', 'Unfollow');
  });
});
