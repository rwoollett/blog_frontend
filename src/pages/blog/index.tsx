import React from "react";
import BlogLayout from "../../components/BlogLayout";
import { GetStaticProps } from "next";
import { BlogPage } from "../../components/BlogPage";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";
import { ArticlesDocument, CategoriesDocument } from "../../../generated/graphql-blog";
import { NextPageWithLayout } from "../_app";
import Layout from "../../components/Layout";

const BlogIndex: NextPageWithLayout = () => {
  return (
    <BlogPage />
  );
}


BlogIndex.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <BlogLayout>
        {page}
      </BlogLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo({});

  await apolloClient.query({
    query: CategoriesDocument,
    context: { clientName: 'strapi' }
  });

  await apolloClient.query({
    query: ArticlesDocument,
    context: { clientName: 'strapi' }
  });

  return addApolloState(apolloClient, {
    props: {}
  });
}

export default BlogIndex;  