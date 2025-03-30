/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

const articleTitle = faker.lorem.words(2);
const articleDescription = faker.lorem.sentence();
const articleText = faker.lorem.sentence(2);

describe('User', () => {
  let user1;
  const userUsername= faker.internet.userName();
  const userEmail = faker.internet.email();
  const userPassword = faker.internet.password();

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
      cy.login(user1.email, user1.username, user1.password);
    });
    cy.get('@createdUser').then((user1) => {
      cy.createArticle(user1.id, articleTitle, articleDescription, articleText)
    .then(response => {
      const slug = response.body.article.slug;
      cy.visit(`/#/articles/${slug}`);
    }); 
    }); 
  });

  beforeEach(() => {        
    cy.register (userEmail,userUsername,userPassword); 
    signInPage.visit();
    signInPage.typeEmail(userEmail);
    signInPage.typePassword(userPassword);
    signInPage.clickSignInBtn(); 
  });

  it('should be able to follow the another user', () => {  
    homePage.clickArticlePreview();
    articlePage.assertFollowBtnText(user1.username);
    articlePage.clickFollowBtn();

    articlePage.assertUnfollowBtnText(user1.username);
  });

})