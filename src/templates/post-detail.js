import React from "react"
import { graphql } from "gatsby"

const PostDetailPage = ({ data }) => {
  return <div>{data?.markdownRemark?.frontmatter?.title}</div>
}

export default PostDetailPage

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
