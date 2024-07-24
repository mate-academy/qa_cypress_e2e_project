/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

    articlePage.clickArticleLink();
    articlePage.inputTitle(article.title);
    articlePage.inputTopic(article.description);
    articlePage.inputBody(article.body);
    articlePage.inputTags(article.tag);
    articlePage.clickPublishBtn();
    articlePage.checkCreatedArticle(article.title);
  });

  it('should be edited using Edit button', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

    articlePage.clickYourFeedTab();
    articlePage.clickArticleThatWasCreated(article.title);
    articlePage.checkCreatedArticle(article.title);
    articlePage.clickEditLink(article.title);

    articlePage.inputTitle(' - edit');
    articlePage.inputTopic(' - edit');
    articlePage.inputBody(' - edit');
    articlePage.clickPublishBtn();
    articlePage.checkEditedArticle(article.title + ' - edit');
  });

  it('should be deleted using Delete button', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

    articlePage.clickYourFeedTab();
    articlePage.clickArticleThatWasCreated(article.title);
    articlePage.clickDeleteBtn();
    articlePage.clickYourFeedTab();
    articlePage.articleWasDeletedSuccessfully(article.title);
  });
});
