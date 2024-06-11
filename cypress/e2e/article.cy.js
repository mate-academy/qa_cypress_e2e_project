/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const newArticlePage = new NewArticlePageObject();
const articlePage = new ArticlePageObject();
const editArticlePage = new EditArticlePageObject();

const userData = {
  username: 'sandra_ma0123',
  email: 'sandra_m0123@test.com',
  password: '000Qwert!'
};

const articleData = {
  title: 'title',
  description: 'description',
  body: 'body'
};

describe('Article', () => {
  let article;

  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    homePage.registeredUser();
    newArticlePage.visit();
  });

  it('should be created using New Article form', () => {
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishArticleBtn();
    articlePage.assertArticleData(article.title, article.body, userData.username);
  });

  it('should be edited using Edit button', () => {
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(article.title, article.body, userData.username);

    articlePage.clickEditBtn();

    editArticlePage.typeEditArticleTitle(articleData.title);
    editArticlePage.typeEditArticleDescription(articleData.description);
    editArticlePage.typeEditArticleBody(articleData.body);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(articleData.title, articleData.body, userData.username);
  });

  it('should be deleted using Delete button', () => {
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(article.title, article.body, userData.username);

    articlePage.clickDeleteBtn();

    articlePage.assertDeletingArticle();
  });
});
