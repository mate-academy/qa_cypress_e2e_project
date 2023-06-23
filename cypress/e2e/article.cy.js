import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
let article;
let user;
const newArticlePage = '#/editor';
const noArticlesMessage = 'No articles are here... yet.';

describe('Article', () => {
  before(() => {
    cy.task('generateUser').then(generatedUser => {
      user = generatedUser;
    });
    cy.task('generateArticle').then(generatedArticle => {
      article = generatedArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);

    cy.visit(newArticlePage);
    articlePage.articleTitleField.type(article.title);
    articlePage.articleDescriptionField.type(article.description);
    articlePage.articleBodyField.type(article.body);
    homePage.clickOnBtn('publish-btn');
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.visit(newArticlePage);
    cy.reload();
    cy.createArticle(article.title, article.description, article.body).then((response) => {
      const slug = response.body.article.slug;
      articlePage.visitArticlePage(slug);
    });
    homePage.clickOnBtn('edit-article');
    articlePage.articleTitleField.type(`{selectAll}${article.title}`);
    articlePage.articleBodyField.type(`{selectAll}${article.body}`);
    homePage.clickOnBtn('publish-btn');
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be deleted using Delete button', () => {
    cy.visit(newArticlePage);
    cy.reload();
    cy.createArticle(article.title, article.description, article.body).then((response) => {
      const slug = response.body.article.slug;
      articlePage.visitArticlePage(slug);
    });
    homePage.clickOnBtn('delete-article');
    articlePage.assertDeletingArticle(noArticlesMessage, article.title);
  });
});
