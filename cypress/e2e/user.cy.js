/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const homePage = new HomePageObject();

describe('User', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
    cy.get('@user').then((user) => {
      cy.createArticle(
        user.id, article.title, article.description, article.body
      ).then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`/#/articles/${slug}`);
      });
    });
  });

  const newUser = {
    newUserName: faker.name.firstName().toLowerCase(),
    newBio: faker.lorem.words(),
    newEmail: faker.internet.email().toLowerCase(),
    newPassword: 'Qwert12345!'
  };

  it('should be able to follow the another user', () => {
    cy.login(newUser.newEmail, newUser.newUserName, newUser.newPassword);
    homePage.visit();
    homePage.clickOnAuthor();
    homePage.clickOnFollowBtn();
    homePage.assertBtnName('Unfollow');
  });

  it('should be able to unfollow the another user', () => {
    cy.login(newUser.newEmail, newUser.newUserName, newUser.newPassword);
    homePage.visit();
    homePage.clickOnAuthor();
    homePage.clickOnFollowBtn();
    homePage.clickUnfollowBtn();
    homePage.assertBtnName('Follow');
  });
});
