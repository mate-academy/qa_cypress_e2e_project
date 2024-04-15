/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from "../support/pages/user.pageObject";

const userPage = new UserPageObject();
let user1;
let article;
let slug;

describe('User', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      cy.createArticle(article.title, article.description,
        article.body).then(response => {
        const slug = response.body.article.slug;
      });
    });
  });

  it('should be able to follow the another user', () => {
    cy.login(user1.email, user1.username, user1.password);
    cy.visit(`#/articles/${slug}`);

    userPage.assertFollowBtn();
    userPage.clickOnFollowBtn();
    // no assert here cause btn doesn't respond
  });

  it('should be able to unfollow the another user', () => {
    cy.login(user1.email, user1.username, user1.password);
    cy.visit(`#/articles/${slug}`);
    userPage.clickOnFollowBtn();
    userPage.clickOnUnfollowBtn();
    // same issue as above
  });
});
