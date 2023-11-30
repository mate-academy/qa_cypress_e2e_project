/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import ArticlePageObject from "../support/pages/article.pageObject";

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('User', () => {
  let user;
  let article;
  let newUser;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email,user.username,user.password)
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      cy.createArticle(article.title, article.description, article.body, article.tag);
    });
    cy.task('generateNewUser').then((generateNewUser) => {
      newUser = generateNewUser;
    });
  });

  it('should be able to follow the another user', () => {
    signUpPage.visit();
    cy.register(newUser.email,newUser.username, newUser.password);
    homePage.visit();
    cy.visit(`/#/articles/${article.title}`);
    articlePage.clickFollowUnfollowBtn();
    articlePage.assertForFollowBtn();
    articlePage.clickFollowUnfollowBtn();
    articlePage.assertForUnfollowBtn();
  });
});
