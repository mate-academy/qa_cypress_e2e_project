/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let article;
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
    articlePage.visit();
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    articlePage.articleTitleField.type(article.title);
    articlePage.articleDescriptionField.type(article.description);
    articlePage.articleBodyField.type(article.body);
    articlePage.articleTagsField.first().type(article.tag);
    articlePage.publishBtn.click();
    articlePage.assertArticlePage(article);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description,
      article.body, article.tag);
    articlePage.editBtn.first().click();
    articlePage.updateArticleTitle(article.newTitle);
    articlePage.updateArticleDescription(article.newDescription);
    articlePage.updateArticleBody(article.newBody);
    articlePage.deleteTag();
    articlePage.updateArticleTags(article);
    articlePage.publishBtn.click();
    articlePage.assertupdateArticlePage(article);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description,
      article.body, article.tag);
    articlePage.deleteBtn.first().click();
    homePage.usernameLink.click();
    articlePage.assertArticleIsDeleat(article);
  });
});
