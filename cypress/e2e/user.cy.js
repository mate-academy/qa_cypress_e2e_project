import ArticlePageObject from '../support/pages/article.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const ArticlePage = new ArticlePageObject();
const SettingsPage = new SettingsPageObject();
const UserPage = new UserPageObject();

describe('User', () => {
  let user;
  let userToFollow;
  let article;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
    cy.task('generateUser').then((generatedUser) => {
      cy.task('generateArticle').then((newArticle) => {
        userToFollow = generatedUser;
        article = newArticle;
        cy.login(userToFollow);
        ArticlePage.visit();
        ArticlePage.createArticle(article);
        SettingsPage.visit();
        SettingsPage.logout();
        cy.login(user);
      });
    });
  });

  it('should be able to follow the another user', () => {
    UserPage.followArticle(article.title);
  });

  it('should be able to unfollow the another user', () => {
    UserPage.unfollowArticle(article.title);
  });
});
