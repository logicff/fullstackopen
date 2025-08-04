const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const logOut = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('input-title').fill(title)
  await page.getByTestId('input-author').fill(author)
  await page.getByTestId('input-url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.locator('.blog-card').filter({ hasText: title }).filter({ hasText: author }).waitFor()
}

const viewBlog = async (page, title, author) => {
  const blogCard = page.locator('.blog-card').filter({ hasText: title }).filter({ hasText: author })
  const viewButton = blogCard.getByRole('button', { name: 'view' })
  const isViewVisible = await viewButton.isVisible()
  if (isViewVisible) {
    await viewButton.click()
  }
}

const hideBlog = async (page, title, author) => {
  const blogCard = page.locator('.blog-card').filter({ hasText: title }).filter({ hasText: author })
  const hideButton = blogCard.getByRole('button', { name: 'hide' })
  const isHideVisible = await hideButton.isVisible()
  if (isHideVisible) {
    await hideButton.click()
  }
}

const likeBlog = async (page, title, author) => {
  const blogCard = page.locator('.blog-card').filter({ hasText: title }).filter({ hasText: author })
  await viewBlog(page, title, author)
  const initialLikesText = await blogCard.getByTestId('likes-count').textContent()
  const initialLikes = parseInt(initialLikesText.split(':')[1].trim(), 10)
  await blogCard.getByRole('button', { name: 'like' }).click()
  await blogCard.getByText(`likes: ${initialLikes + 1}`).waitFor()
}

const removeBlog = async (page, title, author) => {
  const blogCard = page.locator('.blog-card').filter({ hasText: title }).filter({ hasText: author })
  await viewBlog(page, title, author)
  // https://playwright.dev/docs/events
  // page.on 会持续监听，需要使用 page.off 移除，而 page.once 触发一次后自动移除
  page.once('dialog', dialog => dialog.accept())
  await blogCard.getByRole('button', { name: 'remove' }).click()
  await blogCard.waitFor({ state: 'detached' })
}

export { loginWith, logOut, createBlog, viewBlog, hideBlog, likeBlog, removeBlog }