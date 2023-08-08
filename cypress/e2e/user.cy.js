/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

import faker from 'faker';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const userPage = new UserPageObject();

describe('User', () => {
  const user = {
    username: 'qwe' + faker.name.firstName(),
    email: 'qwe' + faker.internet.email(),
    password: 'qW12341234!',
  };

  const article = {
    title: faker.name.firstName(),
    about: faker.name.firstName(),
    body: faker.name.firstName(),
  };

  before(() => {
    cy.task('db:clear');

    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.clickSignUpCompleteBtn();
    cy.wait(1000);
    homePage.clickArticleLink();
    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.about);
    articlePage.typeBody(article.body);
    articlePage.clickPublishArticleBtn();
    cy.wait(500);
  });

  it('should be able to follow the another user', () => {
    signUpPage.visit();
    cy.wait(1000);
    signUpPage.typeUsername('qw' + user.username);
    signUpPage.typeEmail('qw' + user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.clickSignUpCompleteBtn();
    cy.wait(1000);
    homePage.clickYourFeed();
    homePage.clickAuthorLink();
    cy.wait(1000);
    userPage.clickFollowBtn();
    cy.get('.col-xs-12 > div > .btn').should('contain', 'Unfollow')
  });
});
