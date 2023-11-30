/* eslint-disable no-unused-vars */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable semi */
/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const userPage = new ProfilePageObject();
const homePage = new HomePageObject();
const faker = require('faker');
const secondUserUsername = faker.lorem.word();
const secondUserEmail = faker.internet.email();

describe('User', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });
  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
  });

  it('should provide an ability to follow the another user', () => {
    cy.login();
    cy.createArticle();

    cy.clearCookies();

    signUpPage.visit();

    signUpPage.typeUsername(secondUserUsername);
    signUpPage.typeEmail(secondUserEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.clickOkBtn();

    homePage.visit();
    userPage.clickClickableTitle();
    userPage.assertFollowBtnExist();
    userPage.clickFollowBtn();
  });

  it.only('should provide an ability to unfollow the another user', () => {
    cy.login();
    cy.createArticle();

    cy.clearCookies();

    signUpPage.visit();

    signUpPage.typeUsername(secondUserUsername);
    signUpPage.typeEmail(secondUserEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.wait(5000);
    homePage.clickOkBtn();

    homePage.visit();
    userPage.clickClickableTitle();
    userPage.assertFollowBtnExist();
    userPage.clickFollowBtn();
    userPage.clickUnfollowBtn();
  });
});
