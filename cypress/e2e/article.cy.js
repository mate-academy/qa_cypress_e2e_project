/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePageObject from '../support/pages/profile.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import EditorArticlePageObject from '../support/pages/editorArticle.pageObject';

describe('Article', () => {
  let user;
  let profilePage;
  const editorArticlePage = new EditorArticlePageObject();

  beforeEach(() => {
    cy.task('db:clear');

    cy.registerAndLogin().then((generatedUser) => {
      user = generatedUser;
      profilePage = new ProfilePageObject(user.username);
    });
  });

  it('should be created using New Article form', () => {
    const articlePage = new ArticlePageObject();

    cy.task('generateArticle').then((article) => {
      editorArticlePage.visit();

      editorArticlePage.fillForm(article);
      editorArticlePage.clickOnCreateButton();

      articlePage.checkArticle(article);
    });
  });

  it('should be edited using Edit button', function () {
    cy.createArticle(user.id).then(({ title }) => {
      const articlePage = new ArticlePageObject(title);

      articlePage.visit();
      articlePage.clickOnEditButton();

      cy.task('generateArticle').then((article) => {
        editorArticlePage.fillForm(article);
        editorArticlePage.clickOnCreateButton();

        articlePage.checkArticle(article);

        profilePage.visit();
        profilePage.checkArticleCount(1);
      });
    });
  });

  it('should be deleted using Delete button', function () {
    cy.createArticle(user.id).then(({ title }) => {
      const articlePage = new ArticlePageObject(title);

      articlePage.visit();
      articlePage.clickOnDeleteButton();

      profilePage.visit();
      profilePage.checkNoArticlePreviewExists();
    });
  });
});
