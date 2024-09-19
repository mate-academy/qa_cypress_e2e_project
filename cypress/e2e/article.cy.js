/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';

import HomePageObject
  from '../support/pages/home.pageObject';
import ArticlePageObject
  from '../support/pages/article.pageObject';
import NewArticlePageObject
  from '../support/pages/nArticle.pageObject';
import SignInPageObject
  from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const nArticlePage = new NewArticlePageObject();
const signInPage = new SignInPageObject();

describe('Article', () => {
  let user;

  const article = {
    title: 'TITLE',
    about: 'ABOUT',
    text: 'TEXT',
    tag: 'TEST'
  };

  const nArticle = {
    title: faker.lorem.word(),
    about: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    tag: faker.lorem.word()
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
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
    homePage.visit();
    homePage.clickNewArticleLink();

    nArticlePage.typeTitleField(article.title);
    nArticlePage.typeAboutField(article.about);
    nArticlePage.typeTextField(article.text);
    nArticlePage.typeTagField(article.tag);

    nArticlePage.clickPublishBtn();

    articlePage.assertTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    articlePage.visit(`/#/articles/${article.title.toLowerCase()}/`);
    articlePage.clickEditBtn();

    nArticlePage.typeTitleField(nArticle.title);
    nArticlePage.typeAboutField(nArticle.about);
    nArticlePage.typeTextField(nArticle.text);
    nArticlePage.typeTagField(nArticle.tag);
    nArticlePage.clickPublishBtn();

    articlePage.assertTitle(nArticle.title);
    articlePage.assertText(nArticle.text);
  });

  it('should be deleted using Delete button', () => {
    articlePage.visit(`/#/articles/${article.title.toLowerCase()}/`);
    articlePage.clickDeleteBtn();

    homePage.clickYourFeedLink();
    homePage.assertArticle('No articles are here... yet.');
  });
});
