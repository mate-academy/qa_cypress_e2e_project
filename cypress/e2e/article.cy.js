/// <reference types='cypress' />
/// <reference types='../support' />

import { ArticlePageObject } from '../support/pages/article.pageObject';
import { ArticleEditorPageObject } from '../support/pages/articleEditor.pageObject';

const articlePage = new ArticlePageObject();
const articleEditorPage = new ArticleEditorPageObject();

describe('Article page', () => {
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
    cy.register(user.username, user.email, user.password);
    articleEditorPage.visit();
    articleEditorPage.typeTitle(article.title);
    articleEditorPage.typeDescription(article.description);
    articleEditorPage.typeBody(article.body);
    articleEditorPage.typeTag(article.tag);
    articleEditorPage.clickPublishBtn();
    articlePage.assertTitle(article.title);
    articlePage.assertBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(
      user.username, user.email, user.password,
      article.title, article.description, article.body, article.tag
    );
    cy.visit(`/articles/${article.title}`);
    articlePage.clickEditBtn();
    articleEditorPage.typeUpdatedTitle(article.updatedTitle);
    articleEditorPage.typeUpdatedDescription(article.updatedDescription);
    articleEditorPage.typeUpdatedBody(article.updatedBody);
    articleEditorPage.clickPublishBtn();
    articlePage.assertTitle(article.title);
    articlePage.assertBody(article.body);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(
      user.username, user.email, user.password,
      article.title, article.description, article.body, article.tag
    );
    cy.visit(`/articles/${article.title}`);
    articlePage.assertTitle(article.title);
    articlePage.assertBody(article.body);
    articlePage.clickDeleteBtn();
    articlePage.assertTitleAbsence(article.title);
    articlePage.assertBodyAbsence(article.body);
  });
});
