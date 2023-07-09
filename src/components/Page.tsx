import React, { useEffect } from 'react';
import style from './page.module.scss';
import Link from 'next/link';
import { Button } from './ButtonCount';

export const Page: React.FC = () => {

  return (
    <section className={style.section}>
      <h1>Welcome</h1>
      <p><Link href="/blog">Strapi Blog</Link></p>
      <Button primary size='small' label="Count" />
      <div className={style["tip-wrapper"]}>
        <span className={style.tip}>Tip</span> To view the Blog click the link above
      </div>
      <div>
        {/* {content } */}
      </div>
    </section>
  );
};
