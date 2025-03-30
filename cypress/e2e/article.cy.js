/// <reference types='cypress' />
/// <reference types='../support' />

import EditorPageObject from '../support/pages/editor.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
const faker = require('faker');

const editorPage = new EditorPageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;
  const newArticleTitle = faker.lorem.word();

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      generateArticle.author_id = user.id;
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    editorPage.visit();
    editorPage.typeTitle(article.title);
    editorPage.typeDescription(article.description);
    editorPage.typeBody(article.body);
    editorPage.clickPublishBtn();
    editorPage.assertArticleTitle(article.title);
    editorPage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
    });
    editorPage.clickEditBtn();
    editorPage.typeTitle(newArticleTitle);
    editorPage.clickPublishBtn();
    editorPage.assertArticleTitle(newArticleTitle);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
    });
    editorPage.clickDeleteBtn();
    homePage.assertArticleDeleted();
  });
});
