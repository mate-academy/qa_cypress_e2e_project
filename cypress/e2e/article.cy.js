/// <reference types='cypress' />
/// <reference types='../support' />

import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const newArticlePage = new NewArticlePageObject();
const editArticlePage = new EditArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

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
    cy.login(user.username, user.email, user.password);
    newArticlePage.visit();
    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTag(article.tag);
    newArticlePage.clickPublishBtn();
    editArticlePage.assertTitle(article.title);
    editArticlePage.assertBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(user.username, user.email, user.password,
      article.title, article.description, article.body, article.tag)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`#/articles/${slug}`);
      });
    editArticlePage.clickEditBtn();
    newArticlePage.typeUpdateTitle(article.updateTitle);
    newArticlePage.clickPublishBtn();
    editArticlePage.assertTitle(article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(user.username, user.email, user.password,
      article.title, article.description, article.body, article.tag)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`#/articles/${slug}`);
      });
    editArticlePage.clickDeleteBtn();
    editArticlePage.assertTitleAbsence(article.title);
    homePage.assertDeletedArticle(article.title,
      article.description, article.tag);
  });
});
