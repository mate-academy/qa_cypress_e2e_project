/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const editText = ' - edit';

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should be created using New Article form', () => {
    articlePage.clickArticleLink();
    articlePage.typeTitle(article.title);
    articlePage.typeTopic(article.description);
    articlePage.typeBody(article.body);
    articlePage.typeTags(article.tag);
    articlePage.clickPublishBtn();
    articlePage.checkCreatedArticle(article.title);
  });

  it('should be edited using Edit button', () => {
    articlePage.clickYourFeedTab();
    articlePage.clickArticleThatWasCreated(article.title);
    articlePage.checkCreatedArticle(article.title);
    articlePage.clickEditLink(article.title);

    articlePage.typeTitle(editText);
    articlePage.typeTopic(editText);
    articlePage.typeBody(editText);
    articlePage.clickPublishBtn();
    articlePage.checkEditedArticle(article.title + editText);
  });

  it('should be deleted using Delete button', () => {
    articlePage.clickYourFeedTab();
    articlePage.clickArticleThatWasCreated(article.title);
    articlePage.clickDeleteBtn();
    articlePage.clickYourFeedTab();
    articlePage.articleWasDeletedSuccessfully(article.title);
  });
});
