
import userProfilePageObject from "../support/pages/userProfile.pageObject";
const userProfile = new userProfilePageObject();

describe('User', () => {
 
  let user;
  let newUser;

  before(() => {
  cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateUser').then(generateUser => {
      newUser = generateUser;
    });
  });


  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(newUser.email, newUser.username, newUser.password);
    cy.login(newUser.email, newUser.password);
    userProfile.visitUserProfile(user.username);
    userProfile.clickFollowUser();
    userProfile.checkFollowing();
    
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.register(newUser.email, newUser.username, newUser.password);
    cy.login(newUser.email, newUser.password);
    userProfile.visitUserProfile(user.username);
    userProfile.clickFollowUser();
    userProfile.clickUnfollowUser();
    userProfile.checkUnfollowing();
 });
});
