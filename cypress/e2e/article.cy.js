/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePage from '../support/pages/article.pageObject';
import NewArticlePage from '../support/pages/newArticle.pageObject';
import ProfilePage from '../support/pages/profile.pageObject';
import HomePage from '../support/pages/home.pageObject';

const newArticlePage = new NewArticlePage();
const profilePage = new ProfilePage();
const articlePage = new ArticlePage();
const homePage = new HomePage();

describe('Article', () => {
  let user;
  let user2;
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
      cy.register(user.username, user.email, user.password);
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.login(user2.username, user2.email, user2.password);
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.loginSignInPage(user.email, user.password);
    homePage.clickNewArticleForm();
    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTags(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertTitle(article.title);
    articlePage.assertBody(article.body);
    articlePage.assertAuthorName(user.username);

    homePage.clickUsernameLink();
    profilePage.clickOnMyArticleTab();
    profilePage.assertArticleInMyArticles(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.getRegisterUser().then((user2) => {
      cy.createArticle(user2.id, article.body,
        article.description, article.tags, article.title);
    });
    cy.loginSignInPage(user2.email, user2.password);

    homePage.clickUsernameLink();
    profilePage.clickOnMyArticleTab();
    profilePage.visitArticlePage(article.title);

    articlePage.clickEditArticleBtn();
    newArticlePage.editTitle(newArticle.title);
    newArticlePage.editDescription(newArticle.description);
    newArticlePage.editBody(newArticle.body);
    newArticlePage.editTags(newArticle.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertTitle(newArticle.title);
    articlePage.assertBody(newArticle.body);
  });

  it('should be deleted using Delete button ', () => {
    cy.getRegisterUser().then((user2) => {
      cy.createArticle(user2.id, article.body,
        article.description, article.tags, article.title);
    });
    cy.loginSignInPage(user2.email, user2.password);

    homePage.clickUsernameLink();
    profilePage.clickOnMyArticleTab();
    profilePage.visitArticlePage(article.title);

    articlePage.clickDeleteArticleBtn();
    profilePage.visit(user2.username);
    profilePage.assertArticleDeleted();
  });
});
