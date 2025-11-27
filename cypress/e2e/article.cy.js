/// <reference types='cypress' />

import ArticlePage from '../support/pages/article.pageObject';
import SignInPage from '../support/pages/signIn.pageObject';
import { faker } from '@faker-js/faker';

const articlePage = new ArticlePage();
const signInPage = new SignInPage();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then((u) => {
      user = u;
      return u;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.task('generateArticle').then((generated) => {
      article = generated;
    });
  });

  it('should be created using New Article form', () => {
    articlePage.visitNewArticle();
    articlePage.createArticle(article);

    cy.get('[data-cy=article-title]', { timeout: 10000 })
      .should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    articlePage.visitNewArticle();
    articlePage.createArticle(article);

    const updated = {
      title: faker.lorem.words(5),
      description: faker.lorem.words(10),
      body: faker.lorem.paragraphs(2)
    };

    articlePage.editArticle(updated);

    cy.contains(updated.title).should('exist');

    cy.get('[data-cy=article-body]', { timeout: 10000 })
      .should('contain', updated.body);
  });

  it('should be deleted using Delete button', () => {
    articlePage.visitNewArticle();
    articlePage.createArticle(article);

    articlePage.deleteArticle();

    cy.get('[data-cy=article-title]', { timeout: 10000 }).should('not.exist');
  });
});
