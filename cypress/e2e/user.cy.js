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
import ProfilePageObject
  from '../support/pages/profile.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const nArticlePage = new NewArticlePageObject();
const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();

describe('User', () => {
  let fUser;
  let user;

  const article = {
    title: faker.lorem.word(),
    about: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    tag: faker.lorem.word()
  };

  before(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      fUser = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it(':basic setup:', () => {
    cy.register(fUser.email, fUser.username, fUser.password);
    cy.register(user.email, user.username, user.password);

    signInPage.visit();

    signInPage.typeEmail(fUser.email);
    signInPage.typePassword(fUser.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(fUser.username);

    homePage.clickNewArticleLink();

    nArticlePage.typeTitleField(article.title);
    nArticlePage.typeAboutField(article.about);
    nArticlePage.typeTextField(article.text);
    nArticlePage.typeTagField(article.tag);

    nArticlePage.clickPublishBtn();

    articlePage.assertTitle(article.title);
  });

  it.skip('should be able to follow the another user', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

    homePage.clickArticlePreview(article.title);

    articlePage.clickAuthorLink();

    profilePage.clickFollowBtn();

    // assert something
  });

  it.skip('should be able to unfollow the another user', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

    homePage.clickArticlePreview(article.title);

    articlePage.clickAuthorLink();

    profilePage.clickUnfollowBtn();

    // assert something
  });
});
