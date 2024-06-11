/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePageObject from '../support/pages/article.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { generateUser, generateArticle } from '../support/generateData';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const userPage = new UserPageObject();

const article = generateArticle();
const newArticleData = generateArticle();

describe('Article', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    user = generateUser();
    cy.register(user.email, user.username, user.password);
    articlePage.visit();
  });

  it('should be created using only required fields in the New Article form (Title, body)', () => {
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleBody(article.body);
    articlePage.clickPublishArticle();

    articlePage.assertArticleContainsTitle(article.title);
    articlePage.assertArticleContainsAuthor(user.username);
    articlePage.assertArticleContainsBody(article.body);
  });

  it('should be created using all fields (one tag) in the New Article form', () => {
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTag(article.tag1);
    articlePage.clickPublishArticle();

    articlePage.assertArticleContainsTitle(article.title);
    articlePage.assertArticleContainsAuthor(user.username);
    articlePage.assertArticleContainsBody(article.body);
    articlePage.assertArticleContainsTag(article.tag1);
    // here is a bug
  });

  it('should be created using all fields (more than one tag) in the New Article form', () => {
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(`${article.tag1}{enter}${article.tag2}{enter}`);
    articlePage.clickPublishArticle();

    articlePage.assertArticleContainsTitle(article.title);
    articlePage.assertArticleContainsAuthor(user.username);
    articlePage.assertArticleContainsBody(article.body);
    articlePage.assertArticleContainsTag(article.tag1);
    articlePage.assertArticleContainsTag(article.tag2);
  });

  it('should be edited using Edit button', () => {
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(`${article.tag1}{enter}${article.tag2}{enter}`);
    articlePage.clickPublishArticle();
    articlePage.clickEditArticle();

    articlePage.typeArticleTitle(`{selectAll}{backspace}${newArticleData.title}`);
    articlePage.typeArticleDescription(`{selectAll}{backspace}${newArticleData.description}`);
    articlePage.typeArticleBody(`{selectAll}{backspace}${newArticleData.body}`);

    cy.get('.ti-icon-close').eq(0).click();
    cy.get('.ti-icon-close').click();
    articlePage.typeArticleTag(`${newArticleData.tag1}{enter}${newArticleData.tag2}{enter}`);
    articlePage.clickPublishArticle();

    articlePage.assertArticleContainsTitle(newArticleData.title);
    articlePage.assertArticleContainsAuthor(user.username);
    articlePage.assertArticleContainsBody(newArticleData.body);
    articlePage.assertArticleContainsTag(newArticleData.tag1);
    articlePage.assertArticleContainsTag(newArticleData.tag2);
    homePage.usernameLink.click();
    userPage.assertArticlePreviewContainsDescription(newArticleData.description);
  });

  it('should be deleted using Delete button', () => {
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(`${article.tag1}{enter}${article.tag2}{enter}`);
    articlePage.clickPublishArticle();
    articlePage.clickDeleteArticle();
    homePage.usernameLink.click();
    userPage.assertArticleAbsence('No articles are here... yet.');
  });
});
