/// <reference types="cypress" />
/// <reference types="../support" />

import NewArticle from "../support/pages/createArticle.pageObject";
import EditArticle from "../support/pages/editArticle.pageObject";
import ArticleProfile from "../support/pages/articleProfilePage.pageObject";
import UserProfile from "../support/pages/userProfilePage.pageObject";
import faker from 'faker';

let user;
let article;

const newArticle = new NewArticle();
const editArticle = new EditArticle();
const articleProfile = new ArticleProfile();
const userProfile = new UserProfile();

describe('Article', () => {
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
      });
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(500);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    newArticle.visit();
  });

  it('should be created using New Article form', () => {
    newArticle.typeArticleTitle(article.title);
    newArticle.typeAboutArticle(article.description);
    newArticle.typeYourArticleBody(article.body);
    newArticle.typeYourTag(article.tag);
    newArticle.clickOnPublishBtn();
    newArticle.checkArticleTitle(article.title);
    newArticle.checkArticeBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.getUser().then((user) => {
      cy.createArticle(user.id, article.body, article.description, article.tags, article.title);
    });
    articleProfile.visit(article.title);
    articleProfile.clickOnEditBtn();
    editArticle.clearYourArticleBody();
    const newBody = editArticle.createNewWord();
    editArticle.typeYourArticleBody(newBody);
    editArticle.clickOnPublishBtn();
    editArticle.checkArticleTitle(article.title);
    editArticle.checkArticeBody(newBody);
  });

  it('should be deleted using Delete button', () => {
    cy.getUser().then((user) => {
      cy.createArticle(user.id, article.body, article.description, article.tags, article.title);
    });
    articleProfile.visit(article.title);
    articleProfile.clickOnDeleteBtn();
    cy.wait(1000);
    userProfile.visit(user.username);
    userProfile.clickOnMyArticleTab();
    userProfile.verifyDeleteArticle(article.title);
  });
});
