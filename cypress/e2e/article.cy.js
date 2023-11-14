/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePageObject
  from '../support/pages/article.pageObject';

const article = new ArticlePageObject();

describe('Article', () => {
  let user;
  let articles;

  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      articles = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  it('should be created using New Article form', () => {
    article.visit('/#/editor');
    article.titleType(articles.title);
    article.descType(articles.description);
    article.bodyType(articles.body);
    article.tagType(articles.tag);
    article.publishBtn.click();

    article.assertTitle(articles.title);
  });

  it('should be edited using Edit button', () => {
    article.newArticle(articles.title, articles.description, articles.body);

    article.editBtn.click();
    article.titleType(articles.title + 'new');
    article.publishBtn.click();

    article.assertTitle(articles.title + 'new');
  });

  it('should be deleted using Delete button', () => {
    article.newArticle(articles.title, articles.description, articles.body);
    article.deleteBtn.click();

    article.assertConduitBanner();
  });
});
