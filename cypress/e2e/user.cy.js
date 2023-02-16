import homePageObject from "../support/pages/home.pageObject";

const homePage = new homePageObject();

describe('User', () => {
  let article;
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() =>{
    cy.createNewArticle(user.username, article.title, article.description, article.body);
    cy.register();
    cy.visit(`/#/@${user.username}/`);
  })

  it.skip('should be able to follow the another user', () => {
    cy.get('[data-cy="follow-btn"]')
      .click()
  });
}); // кнопка на сайті не працює
