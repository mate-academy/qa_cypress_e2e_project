/// <reference types="cypress" />
/// <reference types="../support" />

import ArticleEditorPageObject from '../support/pages/articleEditor.pageObject';
import ArticlePageObject from '../support/pages/articlePage.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articleEditorPage = new ArticleEditorPageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  const articleChaned = {
    title: faker.lorem.words(),
    description: faker.lorem.words(),
    body: faker.internet.email()
  };

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.login(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    articleEditorPage.visit();
    articleEditorPage.typeArticleTitle(article.title);
    articleEditorPage.typeArticleDescription(article.description);
    articleEditorPage.typeArticleBody(article.body);
    articleEditorPage.typeArticleTag(article.tag);
    articleEditorPage.publishArticle();

    articlePage.assertArticleElements();
  });

  it('should be edited using Edit button', () => {
    articleEditorPage.visit();
    articleEditorPage.createArticleAndVisit(article.title, article.description, article.body);

    articlePage.clickEditArticleBtn();
    articleEditorPage.typeArticleTitle(articleChaned.title);
    articleEditorPage.typeArticleBody(articleChaned.body);
    articleEditorPage.publishArticle();

    articlePage.assertArticleElements(articleChaned.title, articleChaned.body);
    articlePage.assertArticleButtons();
  });

  it('should be deleted using Delete button', () => {
    articleEditorPage.visit();
    cy.createArticle(article.title, article.description, article.body).then(
      (response) => {
        const slug = response.body.article.slug;

        cy.visit(`/article/${slug}`);

        articlePage.clickDeleteArticleBtn();

        homePage.assertAfterDeleteArticle();
      });
  });
});
