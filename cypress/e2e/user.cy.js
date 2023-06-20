/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import AuthorProfil from "../support/pages/authorProfile.pageObject";
import faker from "faker";

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();
const authorProfile = new AuthorProfil();

let testData;
let user;
let article;

describe('User', () => {
  before(() => {
    cy.task('db:clear');
    testData = {
      userName: faker.name.firstName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password()
    };
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.register(testData.email, testData.userName, testData.password);
    cy.login(testData.email, testData.password);
    cy.getUser().then((user) => {
      cy.createArticle(user.id, article.body, article.description, article.tags, article.title);
    });
  });

  it('should be able to follow the another user', () => {
    signUpPage.visit();
    signUpPage.signUp(user.username, user.email, user.password);
    homePage.confirmSuccessReg();
    homePage.clickOnUAuthor(testData.userName);
    authorProfile.clickOnFollowBtn();
    authorProfile.assertFollow(testData.userName);
  });
});
