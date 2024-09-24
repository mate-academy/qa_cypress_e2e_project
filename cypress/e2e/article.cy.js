/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from "../support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import ArticlePageObject from "../support/pages/article.pageObject";

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articleEditor = new ArticlePageObject();
const articleAction = new ArticlePageObject();

let user;

describe("Article", () => {
  before(() => {
    cy.task("generateUser").then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task("db:clear");
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it("should be created using New Article form", () => {
    cy.get('[data-qa="newArticleLinkHeader"]')
      .should("exist")
      .and("be.visible");
    articleAction.NewArticleLink;
    cy.wait(300);

    articleEditor.EditArticleTitle.type("Abc");
    articleEditor.EditArticleDescription.type("Abc");
    articleEditor.EditArticleBody.type("Abc");
    articleEditor.EditArticleTags.type("Abc");
    cy.wait(300);

    cy.get('[data-qa="articleEditPublishButton"]')
      .should("exist")
      .and("be.visible");
    articleAction.HitPublishButton;
    cy.wait(300);
  });

  it("should be edited using Edit button", () => {
    cy.get('[data-qa="newArticleLinkHeader"]')
      .should("exist")
      .and("be.visible");
    articleAction.NewArticleLink;
    cy.wait(300);

    articleEditor.EditArticleTitle.type("Abc");
    articleEditor.EditArticleDescription.type("Abc");
    articleEditor.EditArticleBody.type("Abc");
    articleEditor.EditArticleTags.type("Abc");

    cy.get('[data-qa="articleEditPublishButton"]')
      .should("exist")
      .and("be.visible");
    articleAction.HitPublishButton;
    cy.wait(300);

    cy.get('[data-qa="editArticleButton"]').should("exist").and("be.visible");
    articleAction.HitEditArticleButton;
    cy.wait(300);

    articleEditor.EditArticleTitle.clear().type("Xyz");
    articleEditor.EditArticleDescription.clear().type("Xyz");
    articleEditor.EditArticleBody.clear().type("Xyz");
    articleEditor.EditArticleTags.clear().type("Xyz");
    cy.wait(300);

    cy.get('[data-qa="articleEditPublishButton"]')
      .should("exist")
      .and("be.visible");
    articleAction.HitPublishButton;
    cy.wait(300);
  });

  it("should be deleted using Delete button", () => {
    cy.get('[data-qa="newArticleLinkHeader"]')
      .should("exist")
      .and("be.visible");
    articleAction.NewArticleLink;
    cy.wait(300);

    articleEditor.EditArticleTitle.type("Abc");
    articleEditor.EditArticleDescription.type("Abc");
    articleEditor.EditArticleBody.type("Abc");
    articleEditor.EditArticleTags.type("Abc");
    cy.wait(300);

    cy.get('[data-qa="articleEditPublishButton"]')
      .should("exist")
      .and("be.visible");
    articleAction.HitPublishButton;
    cy.wait(300);

    cy.get('[data-qa="deleteArticleButton"]').should("exist").and("be.visible");
    articleAction.HitDeleteArticleButton;
    cy.wait(300);
  });
});
