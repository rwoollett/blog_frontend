import React from 'react';
import style from './page.module.scss';
import BlogArticles from './BlogArticles';
import { ArticleEntity, ArticlesDocument, ArticlesQuery } from '../../generated/graphql-blog';
import { useQuery } from '@apollo/client';
import { Button } from './ButtonCount';

/**
 * Primary UI component for Blog Page
 */
export const BlogPage: React.FC = () => {

  const { data, loading, error } = useQuery<ArticlesQuery>(ArticlesDocument, {
    context: { clientName: 'strapi' }
  });

  let content: JSX.Element;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (error || !data) {
    content = <p>Error: {JSON.stringify(error)}</p>;
  } else {
    content = <BlogArticles
      articles={data.articles?.data as ArticleEntity[]} />;
  }

  return (
    <section className={`uk-container ${style.section}`}>
      <h1>Blog Pages</h1>
      <Button primary size='small' label="Count" />
      <p>
        <span {...{ "data-uk-icon": "icon: check" }} />
        This is the layout for Blog content
      </p>
      <div className="uk-container uk-container-large">
        {content}
      </div>
    </section>
  );
};
