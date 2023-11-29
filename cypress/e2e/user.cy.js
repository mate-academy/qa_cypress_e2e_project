/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from "../support/pages/user.pageObject";
import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signUpPage = new SignUpPageObject();
const userPage = new UserPageObject();
const homePage = new HomePageObject();
const faker = require("faker");
const anotherUserUsername = faker.lorem.word();
const anotherUserEmail = faker.internet.email();

describe("User", () => {
  let article;
  let user;

  before(() => {
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });
    cy.task("generateArticle").then((generateArticle) => {
      article = generateArticle;
    });
  });
  beforeEach(() => {
    cy.task("db:clear");
    cy.register(user.email, user.username, user.password);
  });

  it.only("should be able to follow the another user", () => {
    cy.login();
    cy.createArticle();

    cy.clearCookies();

    signUpPage.visit();

    signUpPage.typeUsername(anotherUserUsername);
    signUpPage.typeEmail(anotherUserEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.clickOkBtn();

    homePage.visit();
    homePage.clickClickableTitle();
    userPage.assertFollowBtnExist();
    userPage.clickFollowBtn();
  });

  it("should be able to unfollow the another user", () => {
    cy.login();
    cy.createArticle();

    cy.clearCookies();

    signUpPage.visit();

    signUpPage.typeUsername(anotherUserUsername);
    signUpPage.typeEmail(anotherUserEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.clickOkBtn();

    homePage.visit();
    homePage.clickClickableTitle();
    userPage.assertFollowBtnExist();
    userPage.clickFollowBtn();
    userPage.clickUnfollowBtn();
  });
});
