import React, { ReactElement } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import style from '../../../components/BlogArticle.module.scss'
import Layout from "../../../components/Layout";
import BlogLayout from "../../../components/BlogLayout";
import BlogComments from "../../../components/BlogComments";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import {
  Article, ArticleDocument, ArticlesDocument,
  ArticlesQuery, CategoriesDocument, UploadFile,
  useArticleQuery
} from "../../../../generated/graphql-blog";
import {
  addApolloState, initializeApollo
} from "../../../lib/apolloClient";

const BlogArticle: NextPageWithLayout = () => {
  const router = useRouter();
  const { data, loading, error } = useArticleQuery({
    context: { clientName: 'strapi' },
    variables: { slug: router.query.article as string }
  });

  let content: JSX.Element;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (error || !data) {
    content = <p>Error: {JSON.stringify(error)}</p>;
  } else if (data?.articles?.data.length == 0) {
    content = <p>Slug found no articles</p>;
  } else {
    const article = data.articles?.data[0].attributes as Article;
    const image = article.image?.data?.attributes as UploadFile;
    const imageUrl =
      process.env.NODE_ENV !== "development"
        ? `${process.env.NEXT_PUBLIC_STRAPI_APOLLO_SERVER_URL}${image.url}`
        : `${process.env.NEXT_PUBLIC_STRAPI_APOLLO_SERVER_URL}${image.url}`;

    content = (<>
      <div
        id={style.banner}
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.title} {data.articles?.data[0].id}</h1>
      </div>

      <div className="uk-section uk-section-default">
        <div className="uk-container uk-container-large">
          <ReactMarkdown sourcePos={true}>
            {article.content}
          </ReactMarkdown>
          <p>
            <Moment format="MMM Do YYYY">
              {article.publishedAt}
            </Moment>
          </p>
        </div>
      </div>

    </>);
  }

  return (<>
    <section className={style.Article}>
      {content}
    </section>
    <BlogComments />
  </>);
}


BlogArticle.getLayout = function getLayout(page: ReactElement) {
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
    query: ArticleDocument,
    context: { clientName: 'strapi' },
    variables: { slug: params?.article as string }
  }); // Article document for StaticPathProps

  return addApolloState(apolloClient, {
    props: {}
  });
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo({ initialState: {} });
  const { data } = await apolloClient.query<ArticlesQuery>({
    query: ArticlesDocument,
    context: { clientName: 'strapi' }
  });
  const paths = data.articles ?
    data.articles.data.map((attr) => {
      return {
        params: {
          //category: attr.attributes?.category?.data?.attributes?.slug as string,
          article: attr.attributes?.slug as string
        }
      };
    }) : [];


  return {
    paths,
    fallback: false,
  };
}

export default BlogArticle;