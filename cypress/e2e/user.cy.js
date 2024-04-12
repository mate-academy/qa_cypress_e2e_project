/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePage from '../support/pages/article.pageObject';
import MyFeedPage from '../support/pages/myFeed.pageObject';

const myFeedPage = new MyFeedPage();
const articlePage = new ArticlePage();

describe('User', () => {
  let usernameFirstUser;
  let userIdFirstUser;
  let userSecond;

  beforeEach(() => {
    cy.task('db:clear');

    cy.register();
    cy.getCookie('username').then((cookie) => {
      usernameFirstUser = cookie.value;
    });
    cy.getCookie('userId').then((cookie) => {
      userIdFirstUser = cookie.value;
    });
    cy.task('generateUser').then((generateUser) => {
      userSecond = generateUser;
    });
  });

  //Clicking the follow button does not send a request to the server.
  //I can't check follow and unfollow the author

  it('should be able to follow the another user', () => {
    cy.createArticle(3, userIdFirstUser);
    cy.register(userSecond.email, userSecond.username, userSecond.password);
    myFeedPage.visit();
    myFeedPage.clickAuthorLink(usernameFirstUser);
    myFeedPage.clickReadMoreLink();
    articlePage.followAuhtorButton.click();
  });
});
