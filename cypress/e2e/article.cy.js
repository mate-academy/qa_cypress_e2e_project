/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/Article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import generateArticle from '../support/utils/generateArticle';
import generateUser from '../support/utils/generateUser';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    const { username, email, password } = generateUser();
    signInPage.visit();
    cy.register(email, username, password);
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.clickArticleBtn();
  });

  it('should be created using New Article form', () => {
    const { title, description, body, tags } = generateArticle();
    articlePage.typeTitle(title);
    articlePage.typeDescription(description);
    articlePage.typeBody(body);
    articlePage.typeTags(tags);
    articlePage.handleAddingArticle();
    articlePage.articleAssertion(title);
  });

  it('should be edited using Edit button', () => {
    const { title, description, body, tags } = generateArticle();
    articlePage.typeTitle(title);
    articlePage.typeDescription(description);
    articlePage.typeBody(body);
    articlePage.typeTags(tags);
    articlePage.handleAddingArticle();
    articlePage.clickEditArticleBtn();
    articlePage.typeEdittedTitle('New Editted Title');
    articlePage.typeEdittedDescription('New Editted Description');
    articlePage.typeEdittedBody('New Editted Body!!!');
    articlePage.handleAddingArticle();
    articlePage
      .edittedArticleAssertion('New Editted Title', 'New Editted Body!!!\n');
  });

  it('should be deleted using Delete button', () => {
    const { title, description, body, tags } = generateArticle();
    articlePage.typeTitle(title);
    articlePage.typeDescription(description);
    articlePage.typeBody(body);
    articlePage.typeTags(tags);
    articlePage.handleAddingArticle();
    articlePage.clickDeleteArticleBtn();
    homePage.clickHomeLink();
    cy.scrollTo('bottom');
    homePage.assertDeletedArticle(title, description);
  });
});
