/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const homePage = new HomePageObject();
let mainUser, followUser;

describe('User', () => {
  before(() => {
    cy.task('db:clear');

    mainUser = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(10)
    };

    followUser = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(10)
    };

    cy.register(mainUser.email, mainUser.username, mainUser.password);
    cy.register(followUser.email, followUser.username, followUser.password);
  });

  beforeEach(() => {
    cy.login(mainUser.email, mainUser.username, mainUser.password);
  });

  it('should be able to follow another user', () => {
    homePage.visitUserProfile(followUser.username);
    homePage.clickOnFollowBtn();

    homePage.assertBtnName('Unfollow');
  });

  it('should be able to unfollow a followed user', () => {
    homePage.visitUserProfile(followUser.username);

    homePage.clickOnFollowBtn();
    homePage.clickOnFollowBtn();

    homePage.assertBtnName('Follow');
  });
});
