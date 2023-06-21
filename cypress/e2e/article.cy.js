/// <reference types="cypress" />
/// <reference types="../support" />

import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const newArticle = new NewArticlePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let article;

  before(() => {
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.login();
    newArticle.visit();

    newArticle.articleTitleField
      .type(article.title);
    newArticle.articleAboutField
      .type(article.description);
    newArticle.articleBodyField
      .type(article.body);
    newArticle.articleTagsField
      .eq(1)
      .type(article.tag);
    newArticle.articleSubmitBtn.click();

    articlePage.assertNewArticleTitle(article.title);
    articlePage.assertNewArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    newArticle.visit();
    cy.reload();
    cy.createArticle(article.title, article.description, article.body, article.tag).then((respons) => {
      const slug = respons.body.article.slug;
      articlePage.visitArticlePage(slug);
    });

    articlePage.articleEditBtn.eq(0).click();

    newArticle.articleTitleField
      .clear()
      .type(article.title);
    newArticle.articleAboutField
      .clear()
      .type(article.description);
    newArticle.articleBodyField
      .clear()
      .type(article.body);
    newArticle.articleTagsField
      .eq(1)
      .type(article.tag);
    newArticle.articleSubmitBtn.click();

    articlePage.assertNewArticleTitle(article.title);
    articlePage.assertNewArticleBody(article.body);
  });

  it('should be deleted using Delete button', () => {
    newArticle.visit();
    cy.reload();
    cy.createArticle(article.title, article.description, article.body, article.tag).then((respons) => {
      const slug = respons.body.article.slug;
      articlePage.visitArticlePage(slug);
    });

    articlePage.articleDeleteBtn.eq(0).click();

    cy.GlobalArticlesEmptyList('No articles are here... yet.');
  });
});
