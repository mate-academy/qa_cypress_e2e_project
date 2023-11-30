/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import EditArticlePageObject from '../support/pages/editingArticle.pageObject';
import YourFeedPageObject from '../support/pages/yourFeed.pageObject';
import faker from 'faker';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const editArticlePage = new EditArticlePageObject();
const yourFeed = new YourFeedPageObject();

describe('Article', () => {
  let user;
  let article;
  // let editedTitle;
  // let editedBody;
  // let editedDescription;

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
    editArticlePage.visit();
    editArticlePage.typeTitle(article.title);
    editArticlePage.typeDescription(article.description);
    editArticlePage.typeBody(article.body);
    editArticlePage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainTitle(article.title);
  });

  it('should edit title using Edit button', () => {
    const title = faker.lorem.word();

    cy.createArticle(article);

    articlePage.visit(`/#/articles/${article.title}?user_id=${article.author_id}`);
    articlePage.clickEditArticleBtn();

    editArticlePage.changeTitleField(title);
    editArticlePage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainTitle(title);
  });

  it('should edit description using Edit button', () => {
    cy.createArticle();

    articlePage.clickEditArticleBtn();
    editArticlePage.changeDescriptionField();

    editArticlePage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainTitle(article.editedDescription);
  });

  it('should edit body using Edit button', () => {
    cy.createArticle();

    articlePage.clickEditArticleBtn();
    editArticlePage.changeBodyField();

    editArticlePage.clickPublishArticleBtn();

    articlePage.assertArticlePageContainTitle(article.editedBody);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle();

    articlePage.clickDeleteArticleBtn();

    homePage.clickYourFeedLink();
    yourFeed.assertArticleWasDeleted(article.title);
  });
});
