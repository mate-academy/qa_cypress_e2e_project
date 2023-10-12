/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();
let article;
let newArticle;

describe('Article', () => {
  before(() => {
    cy.task('generateArticle').then((generatedArticle) => {
      article = generatedArticle;
    });
    cy.task('generateArticle').then((generatedArticle) => {
      newArticle = generatedArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });
  });

  it('should be created using New Article form', () => {
    articlePage.newArticleForm();

    articlePage.fillArticleTitle(article.title);
    articlePage.fillArticleDescription(article.description);
    articlePage.fillArticleBody(article.body);
    articlePage.fillArticleTags(article.tag);
    articlePage.publishArticle();

    articlePage.isArticlePublished(article.title, article.body);
  });

  it('should be edited using Edit button', () => {
    articlePage.newArticleForm();

    articlePage.fillArticleTitle(article.title);
    articlePage.fillArticleDescription(article.description);
    articlePage.fillArticleBody(article.body);
    articlePage.fillArticleTags(article.tag);
    articlePage.publishArticle();

    articlePage.articleEdit();
    articlePage.clearArticleForm();

    articlePage.fillArticleTitle(newArticle.title);
    articlePage.fillArticleDescription(newArticle.description);
    articlePage.fillArticleBody(newArticle.body);
    articlePage.fillArticleTags(newArticle.tag);
    articlePage.publishArticle();

    articlePage.isArticlePublished(newArticle.title, newArticle.body);
  });

  it('should be deleted using Delete button', () => {
    articlePage.newArticleForm();

    articlePage.fillArticleTitle(article.title);
    articlePage.fillArticleDescription(article.description);
    articlePage.fillArticleBody(article.body);
    articlePage.fillArticleTags(article.tag);
    articlePage.publishArticle();

    articlePage.deleteArticle();
    articlePage.isArticleDeleted(article.title);
  });
});
