const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  const allPosts = result.data.allMarkdownRemark.nodes ?? []
  const postsPerPage = 3
  const totalPostsCount = allPosts.length
  const numberOfPostPages = Math.ceil(totalPostsCount / postsPerPage)

  // Create each post
  allPosts.forEach(post => {
    createPage({
      path: post.fields.slug,
      component: path.resolve(`./src/templates/post-detail.js`),
      context: {
        id: post.id,
      },
    })
  })

  // Create list posts
  Array.from({ length: numberOfPostPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/" : `/page/${i + 1}`,
      component: path.resolve(`./src/templates/post-list.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
      },
    })
  })
}
