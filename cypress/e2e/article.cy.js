/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import NewArticlePageObject from '../support/pages/newArticle.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const newArticlePage = new NewArticlePageObject();

let element;
let user;
let article;
let edits;
let text;

describe('Article', () => {
  before(() => {
    cy.allure()
      .feature('Article flow')
      .epic('Logged in user');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('customVariables').then((customVariables) => {
      element = customVariables;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.task('generateArticle').then((generateArticle) => {
      edits = generateArticle;
    });
    cy.task('websiteText').then((websiteText) => {
      text = websiteText;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.loginUser(user);
  });

  it('should be created using New Article form', () => {
    newArticlePage.openPage(element.url.newArticle);
    newArticlePage.fillIn(element.field.articleTitle, article.title);
    newArticlePage.fillIn(
      element.field.articleDescription, article.description
    );
    newArticlePage.fillIn(element.field.articleBody, article.body);
    newArticlePage.fillIn(element.field.articleTag, article.tag);
    newArticlePage.clickOnButton(element.button.publish);

    articlePage.assertData(element.field.articleTitle, article.title);
  });

  it('should be edited using Edit button', () => {
    articlePage.createArticle(article);
    articlePage.openPage(element.url.article, article.title);
    articlePage.clickOnButton(element.button.editArticle);
    newArticlePage.assertUrl(element.url.newArticle);
    newArticlePage.clearData(element.field.articleTitle);
    newArticlePage.fillIn(element.field.articleTitle, edits.title);
    newArticlePage.clearData(element.field.articleBody);
    newArticlePage.fillIn(element.field.articleBody, edits.body);
    newArticlePage.clickOnButton(element.button.publish);

    articlePage.assertData(element.field.articleTitle, edits.title);
    articlePage.assertData(element.field.articleBody, edits.body);
  });

  it('should be deleted using Delete button', () => {
    articlePage.createArticle(article);
    articlePage.openPage(element.url.article, article.title);
    articlePage.assertData(element.field.articleTitle, article.title);
    articlePage.clickOnButton(element.button.deleteArticle);
    homePage.assertUrl(element.url.homePage);
    homePage.assertData(element.field.articlesList, text.noArticles);
  });
});
