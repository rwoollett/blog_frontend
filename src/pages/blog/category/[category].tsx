import React, { ReactElement } from "react";
import {
  ArticleEntity, CategoryEntity,
  CategoriesDocument, CategoriesQuery, 
  CategoryDocument, useCategoryQuery
} from "../../../../generated/graphql-blog";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/Layout";
import BlogLayout from "../../../components/BlogLayout";
import style from '../../../components/page.module.scss';
import BlogArticles from "../../../components/BlogArticles";
import { addApolloState, initializeApollo } from "../../../lib/apolloClient";
import { GetStaticPaths, GetStaticProps } from "next";

const BlogCategory: NextPageWithLayout = () => {
  const router = useRouter();
  let content: JSX.Element;
  const { data, loading, error } = useCategoryQuery({
    context: { clientName: 'strapi' },
    variables: { slug: router.query.category as string }
  });

  if (loading) {
    content = <p>Loading...</p>;
  } else if (error || !data) {
    content = <p>Error: {JSON.stringify(error)}</p>;
  } else {
    const articles = data.categories?.data.length && data.categories.data[0].attributes?.articles?.data;
    if (articles && articles.length) {
      content = <BlogArticles       
        articles={articles as ArticleEntity[]} />;
    } else {
      content = <p>No Articles Found</p>;
    }
  }

  return (
    <section className={style.section}>
      <h1>Blog Page</h1>
      <div className="uk-container uk-container-large">
        {content}
      </div>
    </section>
  );
};

BlogCategory.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>
        {page}
      </BlogLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo({ initialState: {} });

  await apolloClient.query({
    query: CategoriesDocument,
    context: { clientName: 'strapi' },
    variables: { slug: params?.category as string }
  }); // Blog Nav categories

  await apolloClient.query({
    query: CategoryDocument,
    context: { clientName: 'strapi' },
    variables: { slug: params?.category as string }
  }); // Category articles

  return addApolloState(apolloClient, {
    props: {}
  });
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo({ initialState: {} });
  const { data } = await apolloClient.query<CategoriesQuery>({
    query: CategoriesDocument,
    context: { clientName: 'strapi' }
  });
  const paths = data.categories ?
    data.categories?.data.map((attr: CategoryEntity) => {
      return {
        params: {
          category: attr.attributes?.slug as string
        }
      };
    }) : [];
  return {
    paths,
    fallback: false,
  };
}


export default BlogCategory;