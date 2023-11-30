/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker");

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signUpPage = new SignUpPageObject();


describe('User page', () => {
  let user;
  let newUser;
  let article;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.username, user.email, user.password)
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      cy.createArticle(article.title, article.description, article.body, article.tag);
    });
    cy.task('generateNewUser').then((generateNewUser) => {
      newUser = generateNewUser;
    });
  });

  it('should be able to follow and unfollow the another user', () => {
    cy.clearCookies();

    signUpPage.visit();
    cy.login(newUser.username, newUser.email, newUser.password)
    homePage.visit();
    cy.visit(`/#/articles/${article.title}`);
    articlePage.clickFollowUnfollowUserBtn();
    
    articlePage.assertUnfollowUserBtn();
    articlePage.clickFollowUnfollowUserBtn();
    articlePage.assertFollowUserBtn();
  });
});
