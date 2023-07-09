import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  require: ["ts-node/register"],
  generates: {
    'generated/graphql-comments.tsx': {
      schema: "http://localhost:3002/graphql",
      documents: "src/graphql/queries/comments/**/*.graphql",
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ]
    },
    'generated/graphql-blog.tsx': {
      schema: "http://localhost:1337/graphql",
      documents: "src/graphql/queries/blog/**/*.graphql",
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ]
    },
  },
};
export default config;