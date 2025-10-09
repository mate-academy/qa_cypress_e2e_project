/// <reference types="cypress" />
import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import { faker } from '@faker-js/faker';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

describe('Articles', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should create a new article', () => {
    const article = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph()
    };

    signInPage.signIn(user.email, user.password);

    articlePage.createArticle(article);

    articlePage.assertArticlePresent(article.title);
  });

  it('should edit an article', () => {
    const originalArticle = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph()
    };
    const updatedArticle = {
      title: faker.lorem.words(3) + ' Updated',
      description: faker.lorem.sentence() + ' Updated',
      body: faker.lorem.paragraph() + ' Updated'
    };

    signInPage.signIn(user.email, user.password);

    articlePage.createArticle(originalArticle);

    articlePage.editArticle(updatedArticle);
    articlePage.assertArticlePresent(updatedArticle.title);
  });

  it('should delete an article', () => {
    const article = {
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraph()
    };

    signInPage.signIn(user.email, user.password);
    articlePage.createArticle(article);

    articlePage.deleteArticle();
    articlePage.assertArticleNotPresent(article.title);
  });
});
