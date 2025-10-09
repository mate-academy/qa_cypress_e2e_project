/// <reference types="cypress" />

import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
    article = {
      title: faker.lorem.words(3),
      description: faker.lorem.words(5),
      body: faker.lorem.paragraph()
    };
  });

  beforeEach(() => {
    cy.visit('/');
    cy.register(user.email, user.username, user.password);

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should create an article', () => {
    articlePage.createArticle(article);
    articlePage.assertArticlePresent(article.title);
  });

  it('should edit an article', () => {
    const updatedArticle = {
      title: article.title + ' Updated',
      description: article.description + ' Updated',
      body: article.body + ' Updated'
    };
    articlePage.editArticle(updatedArticle);
    articlePage.assertArticlePresent(updatedArticle.title);
    article = updatedArticle; // update reference for delete test
  });

  it('should delete an article', () => {
    articlePage.deleteArticle();
    articlePage.assertArticleNotPresent(article.title);
  });
});
