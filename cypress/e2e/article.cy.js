/// <reference types='cypress' />
/// <reference types='../support' />

import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import UserProfilePageObject from '../support/pages/userProfile.pageObject';

const { faker } = require('@faker-js/faker');

const createArticlePage = new CreateArticlePageObject();
const articlePage = new ArticlePageObject();
const userProfilePage = new UserProfilePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then(() => {
      cy.login(user.email, user.password, user.username);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    createArticlePage.visit();

    createArticlePage.typeArticleTitle(article.title);
    createArticlePage.typeAricleAbout(article.about);
    createArticlePage.typeArticleBody(article.body);
    createArticlePage.typeArticleTag(article.tag);

    createArticlePage.clickSubmitButton();

    articlePage.assertArticleExistByTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    const newArticleTitle = faker.lorem.word();

    const userId = window.localStorage.getItem('userId');
    cy.createArticle(article.title, article.description, article.body, article.tag, userId)
      .then((response) => {
        cy.visit(`/#/articles/${response.body.article.slug}`);
      });

    articlePage.clickEditArticleButton();

    createArticlePage.typeArticleTitle(newArticleTitle);
    createArticlePage.clickSubmitButton();

    articlePage.assertArticleExistByTitle(newArticleTitle);
  });

  it('should be deleted using Delete button', () => {
    const userId = window.localStorage.getItem('userId');
    cy.createArticle(article.title, article.description, article.body, article.tag, userId)
      .then((response) => {
        cy.visit(`/#/articles/${response.body.article.slug}`);
      });

    articlePage.clickDeleteArticleButton();

    userProfilePage.visit(`http://localhost:1667/#/@${user.username}/`);

    userProfilePage.assertArticleDeletedByTitle();
  });
});
