/// <reference types="cypress" />

declare namespace Cypress {
  interface TestUser {
    id?: number
    username: string
    email: string
    password: string
    token?: string
  }

  interface TestArticle {
    id?: number
    title: string
    description: string
    body: string
    tag?: string
    tags?: string
    slug?: string
  }

  interface Chainable<Subject = any> {
    getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>
    getByDataQa(selector: string): Chainable<JQuery<HTMLElement>>
    register(
      email?: string,
      username?: string,
      password?: string
    ): Chainable<TestUser>
    login(email: string, password: string): Chainable<TestUser>
    createArticle(
      article: TestArticle,
      authorId: number
    ): Chainable<TestArticle>
  }
}
