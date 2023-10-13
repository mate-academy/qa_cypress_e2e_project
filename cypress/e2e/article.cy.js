/// <reference types='cypress' />
/// <reference types='../support' />

import articlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const articlePage = new articlePageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

const faker = require('faker');

const article = {
  title: faker.lorem.words(3),
  about: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  tag: faker.lorem.word()
};

const text = 'No articles are here... yet.'

describe('Article', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then((response) => {
        user = {
          ...user,
          id: response.body.user.id
        };
      });
    });
  });

  it('should be created using New Article form', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  
    articlePage.clickNewArticle();

    articlePage.typeTitle(article.title);
    articlePage.typeAbout(article.about);
    articlePage.typeArticle(article.body);

    articlePage.clickPublishArticle();

    articlePage.assertBannerContainTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.login(user.email, user.password);
    cy.createArticle(article.title, article.about, article.body);

    articlePage.clickEditArticle();

    articlePage.clearArticleTitle();
    articlePage.typeTitle("New title");
    articlePage.clickPublishArticle();

    articlePage.assertBannerContainTitle("New title");
  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.password);
    cy.createArticle(article.title, article.about, article.body);

    articlePage.clickDeleteArticle();
    homePage.assertArticleDeleted(text);
  });
});
