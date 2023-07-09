import React, { HTMLAttributes } from 'react';
import { useCategoriesQuery } from '../../generated/graphql-blog';
import Script from 'next/script';
import { BlogNav, Option } from './BlogNav';
import { useRouter } from 'next/router';
import { ROUTES } from '../constants/routes';

/**
 * BlogLayout for Blogs pages. All pages have the navigation bar of category selector (nav bar)
 *
 */
export default function BlogLayout({ children }: HTMLAttributes<Element>) {
  const router = useRouter();

  const option = router.query.category ? {  // BogNav category selected by BlogNav
    label: router.query.category as string,
    value: ROUTES.BLOGCATEGORY_ROUTE
  } : null;

  const { data, loading, error } = useCategoriesQuery({
    context: { clientName: 'strapi' }
  });

  const [category, setCategory] = React.useState<Option | null>(option);
  const handleSelect = (newOption: Option) => {
    setCategory(newOption);
  };

  let blogNav: JSX.Element;
  if (loading) {
    blogNav = <p>Loading...</p>;
  } else if (error || !data) {
    blogNav = <p>Error: {JSON.stringify(error)}</p>;
  } else {
    const options: Option[] = data.categories?.data ?
      data.categories?.data?.map(
        (category, i) => Object.assign({
          label: category.attributes?.name as string,
          value: `${ROUTES.BLOGCATEGORY_ROUTE}/${category.attributes?.slug as string}`
        }) as Option
      ) : [];

    blogNav = <BlogNav options={options} value={option} onChange={handleSelect} />
  }

  return (
    <>
      <Script src="/js/uikit.min.js" />
      <Script src="/js/uikit-icons.min.js" />
      {blogNav}
      {children}
    </>
  );
}