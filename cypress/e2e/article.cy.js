/// <reference types='cypress' />
/// <reference types='../support' />

import CreateArticlePageObject from '../support/pages/createArticle.pageObject';
import ArticlePagePageObject from '../support/pages/articlePage.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const createArticle = new CreateArticlePageObject();
const articlePage = new ArticlePagePageObject();
const editArticle = new EditArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;
  before(() => {

  });

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
    createArticle.visit();
    createArticle.titleField(article.title);
    createArticle.descriptionField(article.description);
    createArticle.bodyField(article.body);
    createArticle.tagField(article.tag);
    createArticle.clickPublishBtn();
    articlePage.containTitle();
    articlePage.containBody();
  });

  it('should be edited using Edit button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        articlePage.visitArticlePage(slug);
      });
    articlePage.clickEditBtn();
    editArticle.editTitleField(article.editTitle);
    editArticle.editDescriptionField(article.editDescription);
    editArticle.editBodyField(article.editBody);
    editArticle.editTagField(article.editTag);
    editArticle.clickPublishBtn();
    articlePage.containTitle();
    articlePage.containBody();
  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        articlePage.visitArticlePage(slug);
      });
    articlePage.clickDeleteBtn();
    homePage.assertGlobalFeed();
  });
});
