/// <reference types='cypress' />
/// <reference types='../support' />

/// <reference types="cypress" />
/// <reference types="../support" />

import EditorPageObject from '../support/pages/editor.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const editorPage = new EditorPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let art;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      art = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    editorPage.login(user.username, user.email, user.password);
    editorPage.visit();
    editorPage.typeTitle(art.title);
    editorPage.typeDescription(art.description);
    editorPage.typeBody(art.body);
    editorPage.typeTags(art.tag);
    editorPage.clickPublishButton();
    articlePage.assertArticle(art.title, art.body);
  });

  it('should be edited using Edit button', () => {
    editorPage.login(user.username, user.email, user.password);
    editorPage.visit();
    editorPage.createArt(art.title, art.description, art.body, art.tags);
    articlePage.clickEdit();
    editorPage.typeTitle(art.newTitle);
    editorPage.typeBody(art.newBody);
    editorPage.clickPublishButton();
    articlePage.assertArticle(art.newTitle, art.newBody);
  });

  it('should be deleted using Delete button', () => {
    editorPage.login(user.username, user.email, user.password);
    editorPage.visit();
    editorPage.createArt(art.title, art.description, art.body, art.tags);
    articlePage.clickDelete();
    homePage.clickUsername();
    homePage.assertNoArticles();
  });
});
