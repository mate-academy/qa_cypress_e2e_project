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
    articleAction.NewArticleLink;
    articleEditor.EditArticleTitle.type("Abc");
    articleEditor.EditArticleDescription.type("Abc");
    articleEditor.EditArticleBody.type("Abc");
    articleEditor.EditArticleTags.type("Abc");
    articleAction.HitPublishButton;
  });

  it("should be edited using Edit button", () => {
    articleAction.NewArticleLink;
    articleEditor.EditArticleTitle.type("Abc");
    articleEditor.EditArticleDescription.type("Abc");
    articleEditor.EditArticleBody.type("Abc");
    articleEditor.EditArticleTags.type("Abc");
    articleAction.HitPublishButton;
    articleAction.HitEditArticleButton;
    articleEditor.EditArticleTitle.clear().type("Xyz");
    articleEditor.EditArticleDescription.clear().type("Xyz");
    articleEditor.EditArticleBody.clear().type("Xyz");
    articleEditor.EditArticleTags.clear().type("Xyz");
    articleAction.HitPublishButton;
  });

  it("should be deleted using Delete button", () => {
    articleAction.NewArticleLink;
    articleEditor.EditArticleTitle.type("Abc");
    articleEditor.EditArticleDescription.type("Abc");
    articleEditor.EditArticleBody.type("Abc");
    articleEditor.EditArticleTags.type("Abc");
    articleAction.HitPublishButton;
    articleAction.HitDeleteArticleButton;
  });
});
