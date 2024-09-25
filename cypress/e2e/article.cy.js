// import { should } from 'chai';
// import ArticlePageObject from '../support/pages/articlePage.pageObject';
// import HomePageObject from '../support/pages/home.pageObject';
// import SignInPageObject from '../support/pages/signIn.pageObject';

// /// <reference types='cypress' />
// /// <reference types='../support' />

// const articlePage = new ArticlePageObject();
// const homePage = new HomePageObject();
// const signInPage = new SignInPageObject();

// describe('Article page', () => {
//   let user;
//   let articleSlug;
//   beforeEach(() => {
//     cy.task('db:clear');
//     cy.task('generateUser').then((generateUser) => {
//       user = generateUser;
//     });
//   });

//   it('should be created using New Article form', () => {
//     cy.login(user.email, user.username, user.password);
//     cy.visit('/#/editor');
//     articlePage.newArticleBtn.should('be.visible');
//     cy.generateArticle();
//     articlePage.newArticleBtn.click();
//     cy.url().should('be.equal', `/#/article/ + ${slug}`);
//   });

//   it('should be edited using Edit button', () => {

//   });

//   it('should be deleted using Delete button', () => {

//   });
// });
import './commands';

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

/// <reference types="cypress" />
/// <reference types="../support" />

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created by using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/editor');

    cy.getByDataQA('title-field').type(article.title);
    cy.getByDataQA('description-field').type(article.description);
    cy.getByDataQA('body-field').type(article.body);

    cy.getByDataQA('publish-btn').click();

    cy.getByDataQA('article-title').should('contain', article.title);
    cy.getByDataQA('article-body').should('contain', article.body);
    cy.getByDataQA('edit-article').should('exist');
    cy.getByDataQA('delete-article').should('exist');
  });

  it('should be created by using New Article form', () => {
    cy.generateArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/articles/${response.body.article.slug}`)
          .eq(1)
          .click();
        cy.url('not.include', response.body.article.slug);
      });
  });
});

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/editor');
    cy.getByDataQA('title-field')
      .type(article.title);
    cy.getByDataQA('description-field')
      .type(article.description);
    cy.getByDataQA('body-field')
      .type(article.body);
    cy.getByDataQA('publish-btn')
      .click();

    cy.getByDataQA('article-title')
      .should('contain', article.title);
    cy.getByDataQA('article-body')
      .should('contain', article.body);
    cy.getByDataQA('edit-article')
      .should('exist');
    cy.getByDataQA('delete-article')
      .should('exist');
  });

  it('should be deleted using Delete button', () => {
    cy.generateArticle(article.title, article.description, article.body)
      .then((response) => {
        cy.visit(`/articles/${response.body.article.slug}`);
        cy.getByDataQA('delete-article')
          .eq(1)
          .click();
        cy.url()
          .should('not.include', response.body.article.slug);
      });
    cy.document()
      .matchImageSnapshot();
  });
});
