/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
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

  });

  beforeEach(() => {

  });

  it('should be created using New Article form', () => {
    homePage.clickArticleLink();
    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.about);
    articlePage.typeBody(article.body);
    articlePage.clickPublishArticleBtn();
    cy.wait(500);
    cy.get('h1').should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.clickArticleLink();
    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.about);
    articlePage.typeBody(article.body);
    articlePage.clickPublishArticleBtn();
    cy.wait(500);
    articlePage.clickEditArticleBtn();
    articlePage.typeTitle('edit');
    articlePage.typeAbout('edit');
    articlePage.typeBody('edit');
    articlePage.clickPublishArticleBtn();
    cy.get('h1').should('contain', article.title + 'edit');
  });

  it('should be deleted using Delete button', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.clickArticleLink();
    articlePage.typeTitle('delete');
    articlePage.typeAbout(article.about);
    articlePage.typeBody(article.body);
    articlePage.clickPublishArticleBtn();
    cy.wait(500);
    articlePage.clickDeleteArticleBtn();
    cy.wait(3000);
  });
});
