/// <reference types='cypress' />
/// <reference types='../support' />

import userPageObject from "../support/pages/user.pageObject";

const userPage = new userPageObject();

const faker = require('faker');

const article = {
  title: faker.lorem.words(3),
  about: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  tag: faker.lorem.word()
};

describe('User', () => {
  let user;
  let secondUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
        cy.login(user.email, user.password);
          cy.createArticle(article.title, article.about, article.body);
    });

    cy.task('generateUser').then((generateUser) => {
      secondUser = generateUser;
      cy.register(secondUser.email, secondUser.username, secondUser.password)
    });
  });

  it('should be able to follow and unfollow the another user', () => {
    cy.login(secondUser.email, secondUser.password);

    userPage.visitUserPage(user.username);
    userPage.clickAuthorName();
    userPage.clickFollowUser();

    userPage.assertUserFollowed(); 
    //user is not able to follow another user by clicking "follow" button
    //all next tests are blocked because of this

    userPage.clickUnfollowUser();
    userPage.assertUserUnfollowed();
  });
});
