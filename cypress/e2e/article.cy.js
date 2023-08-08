/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;
  let editArticle;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

    cy.task('generateArticle').then((generateEditArticle) => {
      editArticle = generateEditArticle;
    });
  });

  it('should be created using New Article form', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.signIn(user.email, user.password);

    cy.wait(3000);
    articlePage.visit();

    articlePage.typeArticleTitleField(article.title);
    articlePage.typeAboutArticleField(article.description);
    articlePage.typeWriteArticleField(article.body);
    articlePage.typeEnterTagsField(article.tag);
    articlePage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainArticle(article.title);
  });

  it('should be edited using Edit button', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.signIn(user.email, user.password);

    cy.wait(3000);
    articlePage.visit();

    articlePage.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    );
    cy.wait(3000);
    articlePage.clickEditArticleBtn();

    articlePage.editArticle(
      editArticle.title,
      editArticle.description,
      editArticle.body,
      editArticle.tag
    );

    articlePage.assertArticlePageContainArticle(editArticle.title);
  });

  it('should be deleted using Delete button', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.signIn(user.email, user.password);

    cy.wait(3000);
    articlePage.visit();

    articlePage.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    );

    cy.wait(3000);

    articlePage.clickDeleteArticleBtn();

    cy.wait(3000);

    articlePage.assertNotExistArticle();
  });
});
