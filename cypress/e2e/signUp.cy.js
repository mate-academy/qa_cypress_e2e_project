/// <reference types='cypress' />
/// <reference types='../support' />
 import SignUpPageObject from '../support/pages/signUp.pageObject';
 import HomePageObject from '../support/pages/home.pageObject';

 const signUpPage = new SignUpPageObject();
 const homePage = new HomePageObject();
 describe('Sign Up page', () => {
   let user;

   before(() => {
     cy.task('db:clear');
     cy.task('generateUser').then((generateUser) => {
       user = generateUser;
     });
   });

   beforeEach(() => {
     signUpPage.visit();
   });

   it('should provide an ability to successfull sign up', () => {
     homePage.fillField('Email-field', user.email);
     homePage.fillField('Username-field', user.username);
     homePage.fillField('Password-field', user.password);
     signUpPage.clickButtn('.btn');
     signUpPage.assertAllert();
     homePage.assertHeaderContainUsername(user.username);
   });

   it('should not signed up user with invalid "Username" field', () => {
     homePage.fillField('Email-field', user.email);
     homePage.fillField('Username-field', user.invalidUsername);
     homePage.fillField('Password-field', user.password);
     signUpPage.clickButtn('.btn');
     signUpPage.assertErrorMessage('Registration failed!');
   });

   it('should not signed up user with short password', () => {
     homePage.fillField('Email-field', user.email);
     homePage.fillField('Username-field', user.username);
     homePage.fillField('Password-field', user.shortPassword);
     signUpPage.clickButtn('.btn');
     signUpPage.assertErrorMessage('Registration failed!');
   });

   it('should not signed up user with invalid email', () => {
     homePage.fillField('Email-field', user.invalidEmail);
     homePage.fillField('Username-field', user.username);
     homePage.fillField('Password-field', user.shortPassword);
     signUpPage.clickButtn('.btn');
     signUpPage.assertErrorMessage('Email must be a valid email.');
   });

   it('should not signed up  with empty fields', () => {
     signUpPage.clickButtn('.btn');
     signUpPage.assertErrorMessage('Registration failed!');
   });
 });