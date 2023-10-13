/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePage from '../support/pages/article.pageObject';
import NewArticlePage from '../support/pages/newArticle.pageObject';
import ProfilePage from '../support/pages/profile.pageObject';

const newArticlePage = new NewArticlePage();
const profilePage = new ProfilePage();
const articlePage = new ArticlePage();

describe('Article', () => {
  let user;
  let article;
  let newArticle;

  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      newArticle = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.username, user.email, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.getRegisterUser().then((user) => {
      cy.createArticle(user.id, article.body,
        article.description, article.tags, article.title);
    });
  });

  it('should be created using New Article form', () => {
    newArticlePage.visit();
    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTags(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleTitleUrl(article.title);
    articlePage.assertTitle(article.title);
    articlePage.assertBody(article.body);
    articlePage.assertAuthorName(user.username);
  });

  it('should be edited using Edit button', () => {
    articlePage.visit(article.title);
    articlePage.clickEditArticleBtn();
    newArticlePage.editTitle(newArticle.title);
    newArticlePage.editDescription(newArticle.description);
    newArticlePage.editBody(newArticle.body);
    newArticlePage.editTags(newArticle.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleTitleUrl(newArticle.title);
    articlePage.assertTitle(newArticle.title);
    articlePage.assertBody(newArticle.body);
  });

  it('should be deleted using Delete button ', () => {
    profilePage.visit(user.username);
    profilePage.clickOnMyArticleTab();
    profilePage.assertArticleInMyArticles(article.title);
    profilePage.visitArticlePage();
    articlePage.clickDeleteArticleBtn();
    profilePage.visit(user.username);
    profilePage.assertArticleDeleted();
  });

  it('should be deleted using Delete button', () => {
    articlePage.visit(article.title);
    articlePage.clickDeleteArticleBtn();
    profilePage.visit(user.username);
    profilePage.assertArticleDeleted();
  });
});
