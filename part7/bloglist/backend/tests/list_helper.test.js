const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

const listWithZeroBlog = testHelper.listWithZeroBlog
const listWithOneBlog = testHelper.listWithOneBlog
const blogs = testHelper.initialBlogs

const indicatorOfZeroBlog = testHelper.indicatorOfZeroBlog
const indicatorOfOneBlog = testHelper.indicatorOfOneBlog
const indicatorOfBlogs = testHelper.indicatorOfBlogs

describe('Blog List Helper Functions', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

  describe('total likes', () => {
    test('of empty list is zero', () => {
      const total = indicatorOfZeroBlog.totalLikes
      const result = listHelper.totalLikes(listWithZeroBlog)
      assert.strictEqual(result, total)
    })

    test('when list has only one blog, equals the likes of that', () => {
      const total = indicatorOfOneBlog.totalLikes
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, total)
    })

    test('of a bigger list is calculated right', () => {
      const total = indicatorOfBlogs.totalLikes
      const result = listHelper.totalLikes(blogs)
      assert.strictEqual(result, total)
    })
  })

  describe('favorite blog', () => {
    test('of empty list is null', () => {
      const favorite = indicatorOfZeroBlog.favoriteBlog
      const result = listHelper.favoriteBlog(listWithZeroBlog)
      assert.deepStrictEqual(result, favorite)
    })

    test('when list has only one blog, equals the blog', () => {
      const favorite = indicatorOfOneBlog.favoriteBlog
      const result = listHelper.favoriteBlog(listWithOneBlog)
      assert.deepStrictEqual(result, favorite)
    })

    test('of a bigger list is returned right', () => {
      const favorite = indicatorOfBlogs.favoriteBlog
      const result = listHelper.favoriteBlog(blogs)
      assert.deepStrictEqual(result, favorite)
    })
  })

  describe('most blogs', () => {
    test('of empty list is null', () => {
      const most = indicatorOfZeroBlog.mostBlogs
      const result = listHelper.mostBlogs(listWithZeroBlog)
      assert.deepStrictEqual(result, most)
    })

    test('when list has only one blog, equals the {author, 1}', () => {
      const most = indicatorOfOneBlog.mostBlogs
      const result = listHelper.mostBlogs(listWithOneBlog)
      assert.deepStrictEqual(result, most)
    })

    test('of a bigger list is returned right', () => {
      const most = indicatorOfBlogs.mostBlogs
      const result = listHelper.mostBlogs(blogs)
      assert.deepStrictEqual(result, most)
    })
  })

  describe('most likes', () => {
    test('of empty list is null', () => {
      const most = indicatorOfZeroBlog.mostLikes
      const result = listHelper.mostLikes(listWithZeroBlog)
      assert.deepStrictEqual(result, most)
    })

    test('when list has only one blog, equals the {author, likes} of that', () => {
      const most = indicatorOfOneBlog.mostLikes
      const result = listHelper.mostLikes(listWithOneBlog)
      assert.deepStrictEqual(result, most)
    })

    test('of a bigger list is returned right', () => {
      const most = indicatorOfBlogs.mostLikes
      const result = listHelper.mostLikes(blogs)
      assert.deepStrictEqual(result, most)
    })
  })
})