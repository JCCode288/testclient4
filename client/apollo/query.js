import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      authorId
      Category {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      authorId
      Category {
        id
        name
      }
      Author {
        _id
        username
        email
        role
        phoneNumber
        address
      }
      Images {
        productId
        imgUrl
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      Products {
        name
        slug
        id
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query Category($categoryId: ID!) {
    category(id: $categoryId) {
      id
      name
      Products {
        id
        name
        slug
        mainImg
      }
    }
  }
`;
