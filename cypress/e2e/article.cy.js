/// <reference types="cypress" />
import ArticlesPageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import { faker } from '@faker-js/faker';

const articlePage = new ArticlesPageObject();
const signInPage = new SignInPageObject();

describe('Articles page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Pass12345!'
    };
    cy.register(user.email, user.username, user.password);
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should create a new article', () => {
    const article = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      tag: 'test'
    };

    articlePage.createArticle(article);
    articlePage.assertArticleExists(article.title, article.body);
  });

  it('should edit an article', () => {
    const newBody = faker.lorem.paragraph();
    articlePage.editFirstArticle(newBody);
    articlePage.assertArticleBody(newBody);
  });

  it('should delete an article', () => {
    const title = articlePage.getFirstArticleTitle();
    articlePage.deleteFirstArticle();
    articlePage.assertArticleNotExist(title);
  });
});
