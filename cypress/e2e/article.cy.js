/// <reference types='cypress' />
/// <reference types='../support' />

import EditorPageObject from '../support/pages/editor.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const editPage = new EditorPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

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
    editPage.login(user.username, user.email, user.password);
    editPage.visit();
    editPage.typeTitle(article.title);
    editPage.typeDescription(article.description);
    editPage.typeBody(article.body);
    editPage.typeTags(article.tag);
    editPage.clickPublishButton();
    articlePage.assertArticle(article.title, article.body);
  });

  it('should be edited using Edit button', () => {
    editPage.login(user.username, user.email, user.password);
    editPage.visit();
    editPage.createArt(
      article.title, article.description,
      article.body, article.tags);
    articlePage.clickEdit();
    editPage.typeTitle(article.newTitle);
    editPage.typeBody(article.newBody);
    editPage.clickPublishButton();
    articlePage.assertArticle(article.newTitle, article.newBody);
  });

  it('should be deleted using Delete button', () => {
    editPage.login(user.username, user.email, user.password);
    editPage.visit();
    editPage.createArt(
      article.title, article.description,
      article.body, article.tags);
    articlePage.clickDelete();
    homePage.clickUsername();
    homePage.assertNoArticles();
  });
});
