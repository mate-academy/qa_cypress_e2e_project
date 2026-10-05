import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const page = new ArticlePageObject();
const home = new HomePageObject();

describe('Articles', () => {
  let user;
  let article;
  let authorId;

  beforeEach(() => {
    cy.task('generateUser').then((data) => {
      user = data;
      cy.register(user.email, user.username, user.password)
        .then(({ body }) => { authorId = body.user.id; });
      cy.login(user.email, user.password);
    });
    cy.task('generateArticle').then((data) => { article = data; });
  });

  it('creates an article using the New Article form', () => {
    home.visit();
    home.openNewArticle();
    page.fill(article);
    page.publish('POST');
    page.assertArticle(article);
    page.reload();
    page.assertArticle(article);
    page.edit();
    page.assertDescription(article.description);
  });

  it('edits an existing article', () => {
    cy.createArticle(article, authorId).then((created) => {
      page.visit(`/#/articles/${created.slug}`);
    });
    page.edit();
    cy.task('generateArticle').then((updated) => {
      page.fill(updated);
      page.publish('PUT');
      page.assertArticle(updated);
      page.reload();
      page.assertArticle(updated);
      page.edit();
      page.assertDescription(updated.description);
    });
  });

  it('deletes an existing article', () => {
    cy.createArticle(article, authorId).then((created) => {
      page.visit(`/#/articles/${created.slug}`);
      page.assertArticle(article);
      page.delete();
      cy.request({
        url: `/articles/${created.slug}`,
        qs: { user_id: authorId },
        failOnStatusCode: false
      }).its('status').should('eq', 404);
    });
  });
});
