import React from "react";
import Link from "next/link";
import Image from "next/image";
import style from './BlogCard.module.scss';

type BlogCardProps = {
  imageUrl?: string;
  categoryName: string;
  articleTitle: string;
  linkHref: string;
}

const BlogCard = ({ categoryName, articleTitle, linkHref, imageUrl }: BlogCardProps) => {

  return (
    <Link href={linkHref} className="uk-link-reset">
      <div className="uk-card uk-card-default">
        {imageUrl && (<div className="uk-card-media-top">
          <Image className={style.imgShow}
            src={imageUrl}
            alt={articleTitle}
            width={300} height={300} />
        </div>)}
        <div className="uk-card-body">
          <p id="category" className="uk-text-uppercase">
            {categoryName}
          </p>
          <p id="title" className="uk-text-large">
            {articleTitle}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;