/// <reference types='cypress' />
/// <reference types='../support' />

import ArticleEditPageObject from "../support/pages/articleEdit.pageObject";
import ArticlePageObject from "../support/pages/article.pageObject";

const articleEditPage = new ArticleEditPageObject();
const articlePage = new ArticlePageObject();

describe("Article", () => {
  let user;
  let article;
  let userId;

  before(() => {
    cy.task("generateUser").then((generatedUser) => {
      user = generatedUser;
      return cy.task('generateArticle');
    }).then((generatedArticle) => {
      article = generatedArticle;
    });
  });

  beforeEach(() => {
    cy.task("db:clear");
    cy.request("POST", "/users", {
      email: user.email,
      username: user.username,
      password: user.password,
    }).then(({ body }) => {
      userId = body.user.id;
      cy.setCookie("drash_sess", body.user.token);
    });
  });

  it("should be created using New Article form", () => {
    articleEditPage.visit();
    articleEditPage.typeTitle(article.title);
    articleEditPage.typeDescription(article.description);
    articleEditPage.typeBody(article.body);
    articleEditPage.clickPublishBtn();

    articlePage.assertTitle(article.title);
  });

  it("should be edited using Edit button", () => {
    cy.task("generateArticle").then(({ title: newTitle }) => {
      cy.request('POST', '/articles', {
        article: { ...article, author_id: userId },
      }).then(({ body }) => {
        articlePage.visit(body.article.slug);
        articlePage.assertTitle(article.title);
        articlePage.clickEditBtn();

        articleEditPage.titleField
          .should('have.value', article.title)
          .clear()
          .type(newTitle);
        articleEditPage.clickPublishBtn();

        articlePage.assertTitle(newTitle);
      });
    });
  });

  it("should be deleted using Delete button", () => {
    cy.request("POST", "/articles", {
      article: { ...article, author_id: userId },
    }).then(({ body }) => {
      articlePage.visit(body.article.slug);
      articlePage.assertTitle(article.title);
      articlePage.clickDeleteBtn();

      cy.url().should("not.include", "/articles/");
    });
  });
});
