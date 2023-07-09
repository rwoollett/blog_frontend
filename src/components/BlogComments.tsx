import React, { useEffect } from 'react';
import style from './BlogComments.module.scss'
import { useRouter } from "next/router";
import {
  BlogComment,
  OnCommentAddedDocument,
  OnCommentAddedSubscription,
  useArticleBySlugQuery,
  useBlogCommentsByArticleQuery,
  useCreateCommentMutation
} from '../../generated/graphql-comments';
import Comment from './Comment';
import ExpandablePanel from './ExpandablePanel';
import TimeAgo from './TimeAgo';
import Skeleton from './Skeleton';

function BlogComments() {
  const router = useRouter();
  const { subscribeToMore, data, loading, error } = useBlogCommentsByArticleQuery({
    variables: { articleSlug: router.query.article as string }
  });

  const { data: findArticle, loading: loadingArticle } = useArticleBySlugQuery({
    variables: { slug: router.query.article as string }
  });

  useEffect(() =>
    subscribeToMore({
      document: OnCommentAddedDocument,
      variables: { articleSlug: router.query.article as string },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = (subscriptionData.data as OnCommentAddedSubscription).commentAdded;
        return Object.assign({}, prev, {
          blogCommentsByArticle: [newFeedItem, ...prev.blogCommentsByArticle as BlogComment[]],
        });
      }
    }), [router.query.article, subscribeToMore]);

  const [createComment] = useCreateCommentMutation();

  const onCommentSubmit = (comment: string) => {
    createComment({
      variables: {
        message: comment,
        articleSlug: router.query.article as string
      }
    });
  };

  let content: JSX.Element | undefined;
  if (loading || loadingArticle) {
    content = <Skeleton times={3} className={style.loading} />;
  } else if (error) {
    content = <div>{error.message}</div>
  } else {
    const rendered = data?.blogCommentsByArticle?.map(comment => {
      return (
        <li key={comment?.id}>
          <article className="uk-comment uk-visible-toggle" role="comment">
            <header className="uk-comment-header uk-position-relative">
              <div className="uk-grid-medium uk-flex-middle" uk-grid="true">
                <div className="uk-width-expand">
                  {/* <h4 className="uk-comment-title uk-margin-remove">
                <a className="uk-link-reset" href="#">Author</a>
              </h4> */}
                  <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                    <li><a href="#"><TimeAgo timestamp={comment?.publishedAt as string} /></a></li>
                    {/* <li><a href="#">Reply</a></li> */}
                  </ul>
                </div>
              </div>
            </header>
            <div className="uk-comment-body">
              <p>{comment?.message}</p>
            </div>
          </article>
        </li>
      );
    });
    content = (
      <ul className={`${style.comments_list} uk-comment-list`}>
        {rendered}
      </ul>
    );

  }

  let createCommentContent: JSX.Element | undefined;
  if (findArticle?.articleBySlug) {
    createCommentContent = (<>
      <h2 className="uk-heading-line uk-text-large uk-text-center">
        <span>Comments</span>
      </h2>
      <ExpandablePanel header={<>Create Comment</>}>
        <Comment onSubmit={onCommentSubmit} />
      </ExpandablePanel>
    </>);

  }

  return (
    <div className={`${style.comments} uk-section uk-section-default uk-section-xsmall`}>
      <div className="uk-container">
        {createCommentContent}
        {content}
      </div>
    </div>
  )
}

export default BlogComments;

