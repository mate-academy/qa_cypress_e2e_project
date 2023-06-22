/// <reference types="cypress" />
/// <reference types="../support" />
import UserPageObject from '../support/pages/user.pageObject';

const faker = require('faker');

const userPage = new UserPageObject();
describe('User', () => {
  const followUser = {
    username: faker.name.firstName().toLowerCase(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  before(() => {
    cy.task('db:clear');

    cy.register();
    cy.createUser(followUser.email, followUser.username, followUser.password)
  });

  it('should be able to follow the another user', () => {
    cy.visit(`#/@${followUser.username}/`);
    userPage.followButton
      .click();
  });
  it('should be able to unfollow the another user', () => {
    cy.visit('http://localhost:1667/#/' + followUser.username);
    userPage.unfollowButton
      .click();
  });
});
