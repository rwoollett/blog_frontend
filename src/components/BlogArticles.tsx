import React from 'react';
import { ArticleEntity, Category, UploadFile } from "../../generated/graphql-blog";
import BlogCard from './BlogCard';
import { ROUTES } from '../constants/routes';

function createCard(article: ArticleEntity) {
  const image = article.attributes?.image?.data?.attributes as UploadFile;
  const category = article.attributes?.category?.data?.attributes as Category;
  let imageUrl: string|undefined = undefined;
  if (image) { 
      imageUrl = process.env.NODE_ENV !== "development"
    ? `${process.env.NEXT_PUBLIC_STRAPI_APOLLO_SERVER_URL}${image.url}`
    : `${process.env.NEXT_PUBLIC_STRAPI_APOLLO_SERVER_URL}${image.url}`;
  }
  const linkHref = `${ROUTES.BLOGARTICLE_ROUTE}/${article.attributes?.slug}`;

  return (
    <BlogCard
      categoryName={category ? category.name: "General"}
      articleTitle={article.attributes?.title as string}
      linkHref={linkHref}
      imageUrl={imageUrl}
      key={`article__${article.attributes?.slug}`} />
  );
}

function BlogArticles({ articles }: {
  articles: ArticleEntity[];
}) {
  if (!(articles.length > 0)) {
    return <div>No Articles</div>;
  }
  const leftArticlesCount = Math.ceil(articles.length / 5);
  const leftArticles = articles.slice(
    0, leftArticlesCount
  );
  const rightArticles = articles.slice(
    leftArticlesCount, articles.length
  );

  return (
    <div>
      <div className="uk-child-width-1-2 uk-grid">
        <div>
          {leftArticles.map((article) => {
            return createCard(article);
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match uk-grid">
            {rightArticles.map((article) => {
              return createCard(article);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogArticles;
