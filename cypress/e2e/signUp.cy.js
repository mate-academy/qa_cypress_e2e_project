/// <reference types="cypress" />
/// <reference types="../support" />

import { generateData } from "../support/generateData";

describe('Сторінка Реєстрації', () => {
   beforeEach(() => {
      cy.task('db:clear');
      cy.visit('/');
   });

   const { username, email, password } = generateData();
   const failedRegistration = 'Registration failed!';

   it('користувач повинен зареєструватися з валідними даними', () => {
      const successRegistration = 'Your registration was successful!';

      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-text').should('contain.text', successRegistration);
      cy.contains('OK').click();
      cy.getByDataQa('username-link').should('contain.text', username);
   });

   it('користувач не повинен мати можливість зареєструватися з вже зареєтсрованою поштою', () => {
      cy.request('POST', '/users', {
         email,
         username,
         password
      });
      const errorMsg = 'Email already taken.';
      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-title').should('contain.text', failedRegistration);
      cy.get('.swal-text').should('contain.text', errorMsg);
   });

   it('користувач не повинен мати можливість зареєструватися з порожнім полем електронної пошти', () => {
      const errorMsg = 'Email field required.';
      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Password').type(password);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-title').should('contain.text', failedRegistration);
      cy.get('.swal-text').should('contain.text', errorMsg);
   });

   it('користувач не повинен мати можливість зареєструватися з порожнім полем username', () => {
      const errorMsg = 'Username field required.';
      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-title').should('contain.text', failedRegistration);
      cy.get('.swal-text').should('contain.text', errorMsg);
   });

   it('користувач не повинен мати можливість зареєструватися з порожнім полем паролю', () => {
      const errorMsg = 'Password field required.';
      cy.getByDataQa('signUp-link').click();
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Email').type(email);
      cy.getByDataQa('signUp-btn').click();
      cy.get('.swal-title').should('contain.text', failedRegistration);
      cy.get('.swal-text').should('contain.text', errorMsg);
   });
});
