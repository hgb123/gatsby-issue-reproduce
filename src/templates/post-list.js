import React from "react"
import { graphql, navigate } from "gatsby"
import {
  Container,
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react"

const PostListPage = ({ data }) => {
  const {
    allMarkdownRemark: { nodes: posts, pageInfo },
  } = data

  return (
    <Container maxW="container.md">
      <VStack p="10" spacing="20">
        <Heading>Page {pageInfo.currentPage}</Heading>
        <VStack spacing="6">
          {posts.map(({ id, frontmatter: { title } }) => (
            <Text key={id}>{title}</Text>
          ))}
        </VStack>
        <HStack>
          <Button
            disabled={!pageInfo.hasPreviousPage}
            colorScheme="blue"
            onClick={() =>
              navigate(
                pageInfo.currentPage === 2
                  ? `/`
                  : `/page/${pageInfo.currentPage - 1}`
              )
            }
          >
            Previous
          </Button>
          <Button
            disabled={!pageInfo.hasNextPage}
            colorScheme="blue"
            onClick={() => navigate(`/page/${pageInfo.currentPage + 1}`)}
          >
            Next
          </Button>
        </HStack>
        <Box as="pre">{JSON.stringify({ pageInfo }, null, 2)}</Box>
      </VStack>
    </Container>
  )
}

export default PostListPage

export const query = graphql`
  query ($limit: Int!, $skip: Int!) {
    allMarkdownRemark(limit: $limit, skip: $skip) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        totalCount
      }
    }
  }
`
