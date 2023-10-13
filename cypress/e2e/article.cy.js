/// <reference types='cypress' />
/// <reference types='../support' />

import EditPageObject from '../support/pages/edit.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import faker from 'faker';
import HomePageObject from '../support/pages/home.pageObject';
import YourFeedPageObject from '../support/pages/yourFeed.pageObject';

const editPage = new EditPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const yourFeed = new YourFeedPageObject();

describe('Article', () => {
  let user;
  let article;
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then((response) => {
        cy.login(user.email, user.username, user.password);

        user = {
          ...user,
          id: response.body.user.id
        };
      });
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = {
        ...generateArticle,
        author_id: user.id
      };
    });
  });

  it('should be created using New Article form', () => {
    editPage.visit();
    editPage.typeTitle(article.title);
    editPage.typeDescription(article.description);
    editPage.typeBody(article.body);
    editPage.typeTags(article.tag);
    editPage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    const title = faker.lorem.word();
    const description = faker.lorem.word();
    const body = faker.lorem.word();
    const tag = faker.lorem.word();

    cy.createArticle(article);
    articlePage.visit(`/#/articles/${article.title}?user_id=${article.author_id}`);
    articlePage.clickEditArticleBtn();
    editPage.changeTitleField(title);
    editPage.changeDescriptionField(description);
    editPage.changeBodyField(body);
    editPage.changeTagsField(tag);
    editPage.clickPublishArticleBtn();
    articlePage.assertArticlePageContainTitle(article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article);

    articlePage.visit(`/#/articles/${article.title}?user_id=${article.author_id}`);
    articlePage.clickDeleteArticleBtn();
    homePage.clickYourFeedLink();
    yourFeed.assertArticleWasDeleted(article.title);
  });
});
