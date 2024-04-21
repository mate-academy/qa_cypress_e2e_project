/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from "../support/pages/user.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();


describe('User', () => {
  const newUser = {
    email: 'newuser@gmail.com',
    username: 'newusername',
    password: 'Qwertt1233!'
  }
  let user;
  let article;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
      })
      cy.register(user.email, user.username, user.password)
      .then((response) => {
        cy.login(user.email, user.username, user.password);
      });

    }); 
  });

  it('should be able to follow the another user', () => {
    cy.get('@createdUser').then((user) => {
      cy.createArticle(user.id, article.title, article.description, article.body)
      .then(response => {
        const slug = response.body.article.slug;
        cy.visit(`/#/articles/${slug}`)
        cy.wait(5000)
        cy.register(newUser.email, newUser.username, newUser.password);
    signInPage.visit()
    signInPage.typeEmail(newUser.email);
    signInPage.typePassword('Qwertt1233!');
    signInPage.clickSignInBtn(); 
    homePage.assertHeaderContainUsername(user.username);
    homePage.visit();
    homePage.clickOnAuthorLink();
    userPage.clickOnFollowBtn();
    userPage.assertFollowingToUser('Unfollow')
      })
    })
      

      
  });
});
