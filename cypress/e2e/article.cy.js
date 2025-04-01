/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from "../support/pages/article.pageObject";

const articlePage = new ArticlePageObject;

describe("Article", () => {
  let user;
  let article;

  before(() => {
    cy.task("generateUser").then((generateUser) => {
      user = generateUser;
    });

    cy.task("generateArticle").then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    const { email, username, password } = user;
    cy.task("db:clear");
    cy.visit("/#/login");
    cy.register(email, username, password).then(() => {
      cy.request("POST", "users/login", {
        user: {
          email,
          password,
        },
      }).then((response) => {
        cy.setCookie("drash_sess", response.body.user.token);
      });
    });

    articlePage.visit();
  });

  it("should be created using New Article form", () => {
    // cy.createArticle(article.title, article.description, article.body);

    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);

    articlePage.clickSubmit();

    articlePage.checkTitle(article.title);

    cy.assertPageUrl(`/articles/${article.title}`);

    cy.visit("#/");

    articlePage.checkArticles(article.title);
  });

  it("should be edited using Edit button", () => {
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);

    articlePage.clickSubmit();

    articlePage.checkTitle(article.title);

    cy.visit(`#/editor/${article.title}`);

    articlePage.typeNewTitle();
    articlePage.clickSubmit();

    articlePage.checkTitle('New title');
  });

  it.only("should be deleted using Delete button", () => {
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);

    articlePage.clickSubmit();

    articlePage.clickDeleteBtn();

    cy.visit("#/");

    articlePage.checkArticles('No articles are here... yet.');
  });
});
