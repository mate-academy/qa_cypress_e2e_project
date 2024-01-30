/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/Profile.pageObject';


const profilePage = new ProfilePageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let user, user2, article, slug1;
  before(() => {

  });
  beforeEach(() => {
      cy.task('db:clear');
      
      cy.task('generateUser').then((generateUser) => {
        user2 = generateUser;
        cy.register(user2.email, user2.username, user2.password);
      });
      cy.task('generateUser').then((generateUser) => {
        user = generateUser;
        });
        cy.register();
        cy.login();
    });

  it('should be able to follow the another user', () => {
   
    cy.visit('/#/@' + `${user2.username}`);
    profilePage.clickfollowBtn();
    profilePage.unFollowBtn.should('exist');

  });
  it('should be able to unfollow the another user', () => {
    cy.visit('/#/@' + `${user2.username}`);
    profilePage.clickfollowBtn();
    profilePage.clickunFollowBtn();
    profilePage.unFollowBtn.should('not.exist');
  })
});