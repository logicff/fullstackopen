const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, logOut, createBlog, viewBlog, likeBlog, removeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Testing User',
        username: 'tester',
        password: 'password'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Hello User',
        username: 'hello',
        password: 'password'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'tester', 'password')
      await expect(page.getByText('Testing User logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'tester', 'wrong')
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(page.getByText('Testing User logged-in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'tester', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', 'logicff', 'https://localhost')
      const successDiv = page.locator('.success')
      await expect(successDiv).toContainText('a blog created by playwright')
      await expect(successDiv).toContainText('logicff')
      await expect(page.locator('.blog-card').getByText('a blog created by playwright')).toBeVisible()
    })

    describe('and several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first blog', 'logicff', 'https://localhost')
        await createBlog(page, 'second blog', 'logicff', 'https://localhost')
        await createBlog(page, 'third blog', 'logicff', 'https://localhost')
      })

      test('a blog can be liked', async ({ page }) => {
        await likeBlog(page, 'second blog', 'logicff')
        const likesDiv = page.locator('.blog-card')
          .filter({ hasText: 'second blog' }).filter({ hasText: 'logicff' }).getByText('likes')
        await expect(likesDiv).toContainText('likes: 1')
      })

      test('a blog can be deleted by user who added the blog', async ({ page }) => {
        await removeBlog(page, 'second blog', 'logicff')
        const successDiv = page.locator('.success')
        await expect(successDiv).toContainText('succeed to delete the blog')
        await expect(
          page.locator('.blog-card').filter({ hasText: 'second blog' }).filter({ hasText: 'logicff' })
        ).not.toBeVisible()
      })

      test('only the user who added the blog sees the blog\'s delete button', async ({ page }) => {
        await logOut(page)
        await loginWith(page, 'hello', 'password')
        await page.getByText('Hello User logged-in').waitFor()

        await viewBlog(page, 'second blog', 'logicff')
        const blogCard = page.locator('.blog-card').filter({ hasText: 'second blog' }).filter({ hasText: 'logicff' })
        await expect(blogCard.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('blogs are sorted by likes in descending order', async ({ page }) => {
        await likeBlog(page, 'third blog', 'logicff')
        await likeBlog(page, 'third blog', 'logicff')
        const order1 = await page.locator('.blog-card').all()
        await expect(order1[0]).toContainText('third blog')

        await likeBlog(page, 'second blog', 'logicff')
        await likeBlog(page, 'second blog', 'logicff')
        await likeBlog(page, 'second blog', 'logicff')
        const order2 = await page.locator('.blog-card').all()
        await expect(order2[0]).toContainText('second blog')
        await expect(order2[1]).toContainText('third blog')

        await likeBlog(page, 'first blog', 'logicff')
        const order3 = await page.locator('.blog-card').all()
        await expect(order3[0]).toContainText('second blog')
        await expect(order3[1]).toContainText('third blog')
        await expect(order3[2]).toContainText('first blog')
      })
    })
  })
})