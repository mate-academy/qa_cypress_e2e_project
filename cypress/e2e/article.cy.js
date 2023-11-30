import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

/// <reference types='cypress' />
/// <reference types='../support' />

const faker = require('faker');
const editArticlePage = new EditArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;
  let slug;
  const newTitle = faker.random.word();
  const newBody = faker.random.words(5);
  const newDescription = faker.random.words(2);

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password)
        .then(() => {
          editArticlePage.visit();
          editArticlePage.typeTitle(article.title);
          editArticlePage.typeDescription(article.description);
          editArticlePage.typeBody(article.body);
          editArticlePage.typeTags(article.tag);
          editArticlePage.clickPublishBtn();

          articlePage.assertArticleTitle(article.title);
          articlePage.assertArticleBody(article.body);
          articlePage.assertArticleAuthor(user.username);
          articlePage.editBtn.should('exist');
          articlePage.deleteBtn.should('exist');
          homePage.visit();
          homePage.assertArticleTitle(article.title);
          homePage.assertArticleDescription(article.description);
        });
    });
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        cy.visit(`/#/articles/${slug}`);

        articlePage.assertArticleTitle(article.title);

        articlePage.editBtn.eq(0).click();
        editArticlePage.typeTitle(newTitle);
        editArticlePage.typeDescription(newDescription);
        editArticlePage.typeBody(newBody);
        editArticlePage.clickPublishBtn();

        articlePage.assertArticleTitle(newTitle);
        articlePage.assertArticleBody(newBody);
        homePage.visit();
        homePage.assertArticleTitle(newTitle);
        homePage.assertArticleDescription(newDescription);
      });
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        cy.visit(`/#/articles/${slug}`);

        articlePage.assertArticleTitle(article.title);

        articlePage.deleteBtn.eq(0).click();

        homePage.assertDeletedArticle();
      });
  });
});
