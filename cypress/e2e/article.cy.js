/// <reference types='cypress' />
/// <reference types='../support' />

import homePageObject from '../support/pages/home.pageObject';
import articlePageObject from '../support/pages/article.pageObject.js';
import editorPageObject from '../support/pages/editor.pageObject.js';
import YourFeedPageObject from '../support/pages/yourFeed.pageObject.js';
import faker from 'faker';

const homePage = new homePageObject();
const articlePage = new articlePageObject();
const editorPage = new editorPageObject();
const yourFeedPage = new YourFeedPageObject();

let user;
let article;

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password).then(() => {
        cy.login(user.email, user.password);
      });
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    editorPage.visit();
    editorPage.typeTitle(article.title);
    editorPage.typeDescription(article.description);
    editorPage.typeBody(article.body);
    editorPage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    const title = faker.random.word(); 
    const description = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    cy.createArticle(article);

    articlePage.visit(`/#/articles/${article.title}?user_id=${article.author_id}`);
    articlePage.clickEdit();

    editorPage.changeTitle(title);
    editorPage.changeDescription(description);
    editorPage.changeBody(body);
    editorPage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainTitle(title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article);

    articlePage.visit(`/#/articles/${article.title}?user_id=${article.author_id}`);
    articlePage.clickDelete();

    homePage.clickYourFeed();

    yourFeedPage.assertArticleWasDeleted(article.title);
  });
});
