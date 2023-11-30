/// <reference types='cypress' />
/// <reference types='../support' />
 import UserPageObject from '../support/pages/user.pageObject';

 const userPage = new UserPageObject();
 describe('User', () => {
   let user;
   let MyUser;
   beforeEach(() => {
     cy.task('db:clear');
     cy.task('generateUser').then((generateUser) => {
       user = generateUser;
       cy.register(user.email, user.username, user.password);
     });


     cy.task('generateUser').then((generateUser) => {
       MyUser = generateUser;
       cy.register(MyUser.email, MyUser.username, MyUser.password).then(() => {
         cy.login(MyUser.email, MyUser.usermname, MyUser.password);
       });
     });
   });

   it('should provide the ability to follow user', () => {
     userPage.visitUserPage(user.username);
     userPage.clickFollowBtn();
     userPage.assertFollowing();
   });

   it('should provide the ability to unfollow user ', () => {
     userPage.visitUserPage(user.username);
     userPage.clickFollowBtn();
     userPage.clickUnfollowBtn();
     userPage.assertUnfollowing();
   });
 });