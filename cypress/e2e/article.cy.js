/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePage from '../support/pages/article.pageObject';
import NewArticlePage from '../support/pages/newArticle.pageObject';
import ProfilePage from '../support/pages/profile.pageObject';
import HomePage from '../support/pages/home.pageObject';

const newArticleForm = new NewArticlePage();
const profilePage = new ProfilePage();
const articlePage = new ArticlePage();
const homePage = new HomePage();

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
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.createArticle(user.username,
        user.email,
        user.password,
        article.body,
        article.description,
        article.tags,
        article.title);

      cy.login(user.email, user.password);
    });
  });

  it('should be created using New Article form', () => {
    newArticleForm.visit();
    newArticleForm.typeTitle(newArticle.title);
    newArticleForm.typeDescription(newArticle.description);
    newArticleForm.typeBody(newArticle.body);
    newArticleForm.typeTags(newArticle.tag);
    newArticleForm.clickPublishArticleBtn();

    articlePage.assertArticleLink(newArticle.title);
    articlePage.assertTitle(newArticle.title);
    articlePage.assertBody(newArticle.body);
    articlePage.assertAuthorName(user.username);

    homePage.clickUsernameLink();
    profilePage.clickOnMyArticleTab();
    profilePage.assertArticleInMyArticles(newArticle.title);
  });

  it('should be edited using Edit button', () => {
    articlePage.visit(article.title);
    articlePage.clickEditArticleBtn();
    newArticleForm.editTitle(newArticle.title);
    newArticleForm.editDescription(newArticle.description);
    newArticleForm.editBody(newArticle.body);
    newArticleForm.editTags(newArticle.tag);
    newArticleForm.clickPublishArticleBtn();

    articlePage.assertTitle(newArticle.title);
    articlePage.assertBody(newArticle.body);
  });

  it('should be deleted using Delete button ', () => {
    articlePage.visit(article.title);
    articlePage.clickDeleteArticleBtn();
    profilePage.visit(user.username);
    profilePage.assertArticleDeleted();
  });
});
