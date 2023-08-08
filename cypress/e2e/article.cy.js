/// <reference types='cypress' />
/// <reference types='../support' />
import ArticleEditorPageObject from '../support/pages/articleEditor.pageObject';
import ArticlesPageObject from '../support/pages/articles.pageObject';

const articleEditorPage = new ArticleEditorPageObject();
const articlesPage = new ArticlesPageObject();

describe('Article', () => {
  let user;
  let article;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user);
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
      });
    });
  });

  it('should be created using New Article form', () => {
    articleEditorPage.visit();

    articleEditorPage.typeTitleArticle(article.title);
    articleEditorPage.typeAboutArticle(article.description);
    articleEditorPage.typeBodyArticle(article.body);
    articleEditorPage.typeTagsArticle(article.tag);
    articleEditorPage.clickPublishArticleBtn();

    cy.url()
      .should('contain', '/articles');

    cy.findByPlaceholder('Write a comment...')
      .should('be.visible');

    articlesPage.clickEditArticleBtn();
  });

  it('should be edited using Edit button', () => {
    let slug;
    cy.createArticle(article).then((response) => {
      slug = response.body.article.slug;
      articlesPage.visitArticlesPage(slug);
    });

    articlesPage.clickEditArticleBtn();
    articleEditorPage.typeBodyArticle('new');
    articleEditorPage.clickPublishArticleBtn();
    cy.url()
      .should('contain', '/articles');

    cy.findByPlaceholder('Write a comment...')
      .should('be.visible');

    cy.get('p')
      .should('contain', 'new');
  });

  it('should be deleted using Delete button', () => {
    let slug;
    cy.createArticle(article).then((response) => {
      slug = response.body.article.slug;
      articlesPage.visitArticlesPage(slug);
    });

    articlesPage.clickDeleteArticleBtn();
    cy.url()
      .should('contain', '/#');
  });
});
