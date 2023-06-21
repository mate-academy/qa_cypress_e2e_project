/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/user.pageObject';

const faker = require('faker');
const userPage = new UserPageObject();

describe('User', () => {
  let user;

  const followedUser = {
    username: faker.name.firstName(),
    bio: faker.lorem.words(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();

    cy.register(followedUser.email, followedUser.username, followedUser.password);
    cy.login(user.email, user.username, user.password);
  });

  it.skip('should be able to follow the another user', () => {
    userPage.visitFollowedUser(followedUser.username);

    userPage.clickFollowBtn();
    userPage.assertUnfollowBtn(followedUser.username);
  });
  it.skip('should be able to unfollow the another user', () => {
    userPage.visitFollowedUser(followedUser.username);
    userPage.clickFollowBtn();
    userPage.assertUnfollowBtn(followedUser.username);

    userPage.clickUnFollowBtn();
    userPage.assertFollowBtn(followedUser.username);
  });
});
