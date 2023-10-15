/// <reference types='cypress' />
/// <reference types='../support' />

import EditorPageObject from '../support/pages/editor.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import faker from 'faker';
import HomePageObject from '../support/pages/home.pageObject';
import YourFeedPageObject from '../support/pages/yourFeed.pageObject';

const editorPage = new EditorPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const yourFeed = new YourFeedPageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password).then((response) => {
        cy.login(user.email, user.password);

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
    editorPage.visit();
    editorPage.typeTitle(article.title);
    editorPage.typeDescription(article.description);
    editorPage.typeBody(article.body);
    editorPage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    const title = faker.lorem.word();

    cy.createArticle(article);

    articlePage.visit(`/#/articles/${article.title}?user_id=${article.author_id}`);
    articlePage.clickEditArticleBtn();
    cy.wait(2000);

    editorPage.changeTitleField(title);
    editorPage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainTitle(title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article);

    articlePage.visit(`/#/articles/${article.title}?user_id=${article.author_id}`);
    articlePage.clickDeleteArticleBtn();
  
    homePage.clickYourFeedLink();

    yourFeed.assertArticleWasDeleted(article.title);
  });

});
