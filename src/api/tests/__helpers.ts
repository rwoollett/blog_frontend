import { GraphQLClient } from "graphql-request";

type TestContext = {
  client: GraphQLClient;
};

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;

  const graphqlCtx = graphqlTestContext();

  beforeEach(async () => {
    const client = await graphqlCtx.before();
    Object.assign(ctx, {
      client
    });
  });
  afterEach(async () => {
    await graphqlCtx.after();
  });
  return ctx;
}

function graphqlTestContext() {
  const urlInst = `http://localhost:3002/graphql`; // This needs to be a testing server setup (TBD!!)
  return {
    async before() {
      console.log(`🚀  Test GraphQL client ready at: ${urlInst}`);
      return new GraphQLClient(urlInst);

    },
    async after() {
    },
  };
}
