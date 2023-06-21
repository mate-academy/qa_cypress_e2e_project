/// <reference types="cypress" />
/// <reference types="../support" />

import UserPageObject from '../support/pages/user.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const userPage = new UserPageObject();
const homePage = new HomePageObject();

const name = faker.name.firstName() + faker.name.lastName();
const testData = {
  newEmail: faker.internet.email(),
  newUsername: name.toLowerCase(),
  newPassword: '!!2345Qwert'
}

describe('User', () => {
  let user;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(500);
    cy.register(user.email, user.username, user.password);
  });

  it('should be able to follow the another user', () => {
    cy.register(testData.newEmail, testData.newUsername, testData.newPassword);
    cy.login(testData.newEmail, testData.newPassword);
    cy.visit(`/#/@${user.username}`)
    
    userPage.followUserBtn
      .click();

    userPage.unfollowUserBtn
      .should('contain', `Unfollow ${user.username}`)
    
  });

  it('should be able to unfollow the another user', () => {
    cy.register(testData.newEmail, testData.newUsername, testData.newPassword);
    cy.login(testData.newEmail, testData.newPassword);
    cy.visit(`/#/@${user.username}`)
    
    userPage.followUserBtn
      .click();
    userPage.unfollowUserBtn
      .click();

    userPage.unfollowUserBtn
      .should('contain', `Follow ${user.username}`)
    
  });
});
