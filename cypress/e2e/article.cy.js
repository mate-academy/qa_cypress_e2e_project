/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePageObject from '../support/pages/article.pageObject';
const articlePage = new ArticlePageObject();

let user;
let article;
describe('Article', () => {
  before(() => {});

  beforeEach(() => {
    //cy.task('db:clear');
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    articlePage.loginUser(user.email, user.username, user.password);
    cy.visit('#/editor');
    articlePage.typeArticleTitle(article.title);
    articlePage.typeInAboutField(article.description);
    articlePage.typeInBodyField(article.body);
    articlePage.clickSubmitBtn;
    articlePage.assertionArticleTitle(article.title);
    articlePage.assertionArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    const editedBody = article.body + Math.floor(Math.random() * 100);
    articlePage.addArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    );
    articlePage.getEditButton.as('edBut').click({ multiple: true });
    articlePage.typeNewArticleBody(editedBody);
    articlePage.clickSubmitBtn;
    articlePage.assertionArticleBody(editedBody);
  });

  it('should be deleted using Delete button', () => {
    articlePage.addArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    );
    cy.getByDataCy('deleteButton').as('btn').click({ multiple: true });
    cy.get('.swal-button.swal-button--confirm').click();
    cy.getByDataCy('articleTitle').should('not.contain.text', article.title);
    cy.getByDataCy('articleBody').should('not.contain.text', article.body);
  });
});
