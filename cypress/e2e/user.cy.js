/// <reference types='cypress' />
/// <reference types='../support' />
import faker from 'faker';
import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
const homePage = new HomePageObject();
const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let article;
  let registerUser;
  const user2 = {
    email: faker.internet.email(),
    username: faker.name.firstName(),
    password: 'Abra#24Kadabra'
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password).then((responce) => {
      registerUser = responce.body.user;
    });
    cy.login(user.email, user.username, user.password);
  });

  it('should be able to follow the another user', () => {
    homePage.visit();
    cy.register(user2.email, user2.username, user2.password);
    cy.login(user2.email, user2.username, user2.password);
    cy.createArticle(
      article.title, article.description, article.body, registerUser.id)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`http://localhost:1667/#/articles/${slug}`);
      });

    homePage.clickHomeLink();
    userPage.clickYourFeedLink();
    userPage.clickAuthorLink();
    userPage.clickFollowBtn();
    userPage.assertFollowUser();
  });
});
