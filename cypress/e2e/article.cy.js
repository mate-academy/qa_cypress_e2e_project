/// <reference types="cypress" />
/// <reference types="../support" />
import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const newArticlePage = new NewArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
let article;

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle')
      .then(generateArticle => {
        article = generateArticle;
      });
  });

  it('should be created using New Article form', () => {
    cy.register();
    newArticlePage.visit();
    newArticlePage.typeArticleTitle(article.title);
    newArticlePage.typeArticleDescription(article.description);
    newArticlePage.typeArticleBody(article.body);
    newArticlePage.typeArticleTag(article.tag);
    newArticlePage.clickSubmitBtn();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    newArticlePage.visit();
    cy.reload();
    cy.createArticle(article.title, article.description, article.body, article.tag).then((respons) => {
      const slug = respons.body.article.slug;
      articlePage.visitArticlePage(slug);
    });
    articlePage.clickEditBtn();
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.clickSubmitBtn();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be deleted using Delete button', () => {
    newArticlePage.visit();
    cy.reload();
    cy.createArticle(article.title, article.description, article.body, article.tag).then((respons) => {
      const slug = respons.body.article.slug;
      articlePage.visitArticlePage(slug);
    });
    articlePage.clickDeleteBtn();
    homePage.assertDeletingArticle(article.title);
  });
});
