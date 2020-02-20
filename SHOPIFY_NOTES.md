mutation($input: MetafieldStorefrontVisibilityInput!) {
  metafieldStorefrontVisibilityCreate(
    input: $input
  ) {
    metafieldStorefrontVisibility {
      id
    }
    userErrors {
      field
      message
    }
  }
}

# query{
#   products (first: 5) {
#     edges {
#       node {
# 				id
#         variants(first: 5) {
#           edges {
#             node {
#               id
#               metafields(first: 5) {
#                 edges {
#                   node {
#                     namespace
#                     key
#                     value
#                     ownerType
#                   }
#                 }
#               }
#             }
#           }
#         }
#       }
#     }
#   }
# }

{
  "input": {
    "namespace": "arena",
    "key": "specInfo",
    "ownerType": "PRODUCTVARIANT"
  }
}
