/// <reference types="cypress" />
/// <reference types="../support" />

import EditorPageObject from '../support/pages/editor.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const editorPage = new EditorPageObject();
const articlePage = new ArticlePageObject();
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
    editorPage.visit();

    editorPage.typeTitle(article.title);
    editorPage.typeAbout(article.description);
    editorPage.typeArticle(article.body);
    //editorPage.typeTag(article.tag);
    editorPage.clickPublishBtn();

    // assert article created
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);

    // assert article visible on global feed
    homePage.visit();
    homePage.clickGlobalFeedButton();
    homePage.assertArticleTitle(article.title);
    homePage.assertArticleDescription(article.description);

  });

  it('should be edited using Edit button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);

    // find article and click edit
    homePage.visit();
    homePage.clickUsernameLink();
    homePage.clickArticleTitle();
    articlePage.clickEditArticleBtn();

    // edit the article
    editorPage.typeTitle(' title edited');
    editorPage.typeAbout(' description edited');
    editorPage.typeArticle(' body edited');
    //editorPage.typeTag(article.tag);
    editorPage.clickPublishBtn();

    // assert article edited
    homePage.clickUsernameLink();
    homePage.assertArticleTitle(article.title + ' title edited');
    homePage.
      assertArticleDescription(article.description + ' description edited');
    homePage.clickArticleTitle();
    articlePage.assertArticleTitle(article.title + ' title edited');
    articlePage.assertArticleBody(article.body + ' body edited');
  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle(article.title, article.description, article.body);

    // find article and click delete
    homePage.visit();
    homePage.clickUsernameLink();
    homePage.clickArticleTitle();
    articlePage.clickDeleteArticleBtn();

    // assert article removed
    homePage.clickGlobalFeedButton();
    homePage.assertArticleTitleRemoved(article.title);
    homePage.assertArticleDescriptionRemoved(article.description);
  });
});
