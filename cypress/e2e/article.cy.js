/// <reference types="cypress" />

/// <reference types='../support' />

import EditorArticlePageObject from '../support/pages/editorArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const editorArticlePage = new EditorArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const userPage = new UserPageObject();

describe('Article', () => {
  let user;
  let article;
  let slug;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    editorArticlePage.visit();
    editorArticlePage.typeTitle(article.title);
    editorArticlePage.typeDescription(article.description);
    editorArticlePage.typeBody(article.body);
    editorArticlePage.typeTags(article.tags);
    editorArticlePage.clickPublishBtn();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        articlePage.visitArticlePage(slug);
        articlePage.clickEditBtn();
        editorArticlePage.editTitle(article.editTitle);
        editorArticlePage.editDescriotion(article.editDescription);
        editorArticlePage.editBody(article.editBody);
        editorArticlePage.editTags(article.editTags);
        editorArticlePage.clickPublishBtn();
        articlePage.assertArticleTitle(article.editTitle);
        articlePage.assertArticleBody(article.editBody);
      });
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        articlePage.visitArticlePage(slug);
        articlePage.clickDeleteBtn();
        homePage.clickOnUsernameLink();
        userPage.assertNoArticle();
      });
  });
});
