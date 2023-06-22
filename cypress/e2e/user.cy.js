/// <reference types="cypress" />
/// <reference types="../support" />
import UserPageObject from "../support/pages/user.pageObject";

const faker = require('faker');
const userPage = new UserPageObject;

describe('User', () => {
  let user;

  const newUser = {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it.skip('should be able to follow the another user', () => {
    cy.register(newUser.email, newUser.username, newUser.password);
    cy.login(user.email, user.username, user.password);
    userPage.visitUserPage(newUser.username);
    userPage.clickOnFollowBtn();
    userPage.assertUnFollowBtn(newUser.username);

    userPage.clickOnUnFollowBtn();
    userPage.assertFollowBtn(newUser.username);
  });
});

