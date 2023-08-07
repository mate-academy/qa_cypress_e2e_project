/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articlePage = new ArticlePageObject();
const editArticlePage = new EditArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let article;
  let editedArticle;
  let slug;
  let userId;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateArticle').then((generateArticle) => {
      editedArticle = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register('user.email@dsa.com', 'user.username', 'Qwerty!23');
    articlePage.visit();
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDesc(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(article.tag);
    articlePage.clickPublishArticleBtn();
    cy.get('h1').should('contain', article.title);
    cy.url().should('include', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        userId = response.body.article.author_id;
      }).then(() => {
        articlePage.visitWithSlug(slug, userId);
      });
    articlePage.clickEditArticleBtn();
    editArticlePage.editArticleTitle(editedArticle.title);
    editArticlePage.editArticleDesc(editedArticle.description);
    editArticlePage.editArticleBody(editedArticle.body);
    articlePage.clickPublishArticleBtn();
    articlePage.assertArticleBodyMatches(editedArticle.body);
    articlePage.assertArticleTitle(editedArticle.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        userId = response.body.article.author_id;
      }).then(() => {
        articlePage.visitWithSlug(slug, userId);
      });
    articlePage.clickDeleteArticleBtn();
    articlePage.assertDeletedArticleMessage(
      'Deleted the article. ' +
      'Going home...'
    );
    homePage.assertMainPageUrl();
  });
});
