/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signup.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should register a new user successfully', () => {
    const user = signUpPage.registerUser();
    homePage.assertHeaderContainUsername(user.username);
    signUpPage.verifyRegistrationSuccess(); // Перевірка успішності реєстрації
  });

  it('should show error when username is missing', () => {
    signUpPage.registerUserWithMissingUsername(); // Виконуємо реєстрацію без юзернейма
    signUpPage.verifyRegistrationError('Username field required');// Перевіряємо, що відобразилась помилка
  });

  it('should show error when email is missing', () => {
    signUpPage.registerUserWithMissingEmail(); // Виконуємо реєстрацію без електронної пошти
    signUpPage.verifyRegistrationError('Email field required'); // Перевіряємо, що відобразилась помилка
  });

  it('should show error when password is missing', () => {
    signUpPage.registerUserWithMissingPassword(); // Виконуємо реєстрацію без пароля
    signUpPage.verifyRegistrationError('Password field required'); // Перевіряємо, що відобразилась помилка
  });

  it('should show error when email is invalid', () => {
    signUpPage.registerUserWithInvalidEmail(); // Виконуємо реєстрацію з недійсним email
    signUpPage.verifyRegistrationError('Email must be a valid email'); // Перевіряємо, що відобразилась помилка
  });

  it('should show error when password is 7 symbols', () => {
    signUpPage.registerUserWithShortPassword(); // Виконуємо реєстрацію з коротким паролем
    signUpPage.verifyRegistrationError('Password must be 8 characters long'); // Перевіряємо, що відобразилась помилка
  });

  it('should show error when password is 9 symbols', () => {
    signUpPage.registerUserWithNineCharacterPassword(); // Виконуємо реєстрацію з паролем з 9 символів
    signUpPage.verifyRegistrationError('Password must be 8 characters long'); // Перевіряємо, що відобразилась помилка
  });

  it('should show error when password does not contain a number', () => {
    signUpPage.registerUserWithoutNumberInPassword(); // Виконуємо реєстрацію з паролем без цифр
    signUpPage.verifyRegistrationError('Password must be 8 characters long'); // Перевіряємо, що відобразилась помилка
  });

  it('should show error if password does not contain uppercase letter', () => {
    signUpPage.registerUserWithNumberWithoutUpperCase(); // Виконуємо реєстрацію з паролем, що містить цифри, але без великих літер
    signUpPage.verifyRegistrationError('Password must be 8 characters long'); // Перевіряємо, що відобразилась помилка
  });

  it('should show an error when registering with an existing email', () => {
    // Крок 1: Реєструємо нового користувача
    const user = signUpPage.registerUser();
    homePage.assertHeaderContainUsername(user.username);
    signUpPage.verifyRegistrationSuccess();

    // Крок 2: Виходимо з облікового запису
    signUpPage.navigateToSettingsAndLogout();

    // Крок 3: Переходимо на сторінку реєстрації
    signUpPage.navigateToSignUpPage();
    // Крок 4: Спробуємо зареєструвати іншого користувача з тією самою електронною поштою
    signUpPage.registerUserWithExistingEmail(user);
    // Крок 5: Перевіряємо, що з'явилось повідомлення про помилку
    signUpPage.verifyRegistrationError('Email already taken');
  });
});
