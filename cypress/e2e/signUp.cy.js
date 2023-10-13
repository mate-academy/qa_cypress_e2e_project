/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/SignUp.PageObject';

const signUpPageOb = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
  const dataTest = {
    existEmail: 'asdsa@dsfs.asd',
    wrongName: 'asjdiajdiwdjaiwjdiajidjiwadiawidjwaidaiwjdiwajda0283029',
    shortPass: '12345',
    failEmail: 'asdad@adadsa',
    sevenCharactersPasswrod: 'Werry45',
    upperCasePassword: 'HELLO13102023',
    lowerCasePassword: 'hello13102023',
    withoutDigitsPassword: 'Helloeveryonehere'
  };
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should successfully sign up', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typeEmail(dataTest.existEmail);
    signUpPageOb.typePassword(user.password);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.RegisterProov();
    signUpPageOb.clickProoveBtn();
    signUpPageOb.confirmUserNameInProfile(user.username);
  });

  it('sign up without username field', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeEmail(user.email);
    signUpPageOb.typePassword(user.password);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailOne();
    signUpPageOb.clickFailBtn();
  });

  it('sign up without email field', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typePassword(user.password);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailTwo();
    signUpPageOb.clickFailBtn();
  });

  it('sign up without password field', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typeEmail(user.email);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailThree();
    signUpPageOb.clickFailBtn();
  });

  it('sign up with all blank fields', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailOne();
    signUpPageOb.clickFailBtn();
  });

  it('sign up with 51symbols is username field', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(dataTest.wrongName);
    signUpPageOb.typeEmail(user.email);
    signUpPageOb.typePassword(user.password);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailSix();
    signUpPageOb.clickFailBtn();
  });

  it('sign up with 5 digits in password field', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typeEmail(user.email);
    signUpPageOb.typePassword(dataTest.shortPass);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailPasswordField();
    signUpPageOb.clickFailBtn();
  });

  it('sign up with 7 characters in password field', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typeEmail(user.email);
    signUpPageOb.typePassword(dataTest.sevenCharactersPasswrod);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailPasswordField();
    signUpPageOb.clickFailBtn();
  });

  it('sign up without Uppercase caracters in password field', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typeEmail(user.email);
    signUpPageOb.typePassword(dataTest.lowerCasePassword);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailPasswordField();
    signUpPageOb.clickFailBtn();
  });

  it('sign up without lowercase caracters in password field', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typeEmail(user.email);
    signUpPageOb.typePassword(dataTest.upperCasePassword);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailPasswordField();
    signUpPageOb.clickFailBtn();
  });

  it('sign up without digits in password field', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typeEmail(user.email);
    signUpPageOb.typePassword(dataTest.withoutDigitsPassword);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailPasswordField();
    signUpPageOb.clickFailBtn();
  });

  it('sign up with wrong email format ', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typeEmail(dataTest.failEmail);
    signUpPageOb.typePassword(user.password);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailFour();
    signUpPageOb.clickFailBtn();
  });

  it('sign up with existing email', () => {
    signUpPageOb.visitRegisterPage();
    signUpPageOb.typeName(user.username);
    signUpPageOb.typeEmail(dataTest.existEmail);
    signUpPageOb.typePassword(user.password);
    signUpPageOb.clickSignUpBtn();
    signUpPageOb.confirmFailFive();
    signUpPageOb.clickFailBtn();
  });
});
