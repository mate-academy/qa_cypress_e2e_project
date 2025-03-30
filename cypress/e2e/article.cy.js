/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import CreatedArticlePage from '../support/pages/createdArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const createdArticlePage = new CreatedArticlePage();

let user;
let newArticle;

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      newArticle = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.newArticleLinkClick();

    articlePage.typeTitle(newArticle.title);
    articlePage.typeAbout(newArticle.description);
    articlePage.typeBody(newArticle.body);
    articlePage.typeTag(newArticle.tag);
    articlePage.clickPublishButton();

    createdArticlePage.asseertCreatedArticleTitle(newArticle.title);
    createdArticlePage.asseertCreatedArticleBody(newArticle.body);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.newArticleLinkClick();

    articlePage.typeTitle(newArticle.title);
    articlePage.typeAbout(newArticle.description);
    articlePage.typeBodySevenWords(newArticle.bodySevenWords);
    articlePage.typeTag(newArticle.tag);
    articlePage.clickPublishButton();

    createdArticlePage
      .asseertCreatedArticleTitle(newArticle.title);
    createdArticlePage
      .asseertCreatedArticleBodySevenWords(newArticle.bodySevenWords);

    createdArticlePage.editButtonClick();
    articlePage.typeTitle(newArticle.updatedTitle);
    articlePage.clickPublishButton();

    createdArticlePage.asseertCreatedArticleTitle(newArticle.title);

    createdArticlePage.editButtonClick();
    articlePage.typeBody(newArticle.updatedBodySevenWords);

    articlePage.clickPublishButton();
    createdArticlePage
      .asseertCreatedArticleBodySevenWords(newArticle.bodySevenWords);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.newArticleLinkClick();

    articlePage.typeTitle(newArticle.title);
    articlePage.typeAbout(newArticle.description);
    articlePage.typeBodySevenWords(newArticle.bodySevenWords);
    articlePage.typeTag(newArticle.tag);
    articlePage.clickPublishButton();

    createdArticlePage.asseertCreatedArticleTitle(newArticle.title);
    createdArticlePage
      .asseertCreatedArticleBodySevenWords(newArticle.bodySevenWords);

    createdArticlePage.deleteButtonClick();
    homePage.yourFeedToggleClick();
    homePage.asserArticleIsDeleted();
  });
});
