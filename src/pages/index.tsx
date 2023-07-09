import { ReactElement } from "react";
import { Page } from "../components/Page";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";

const Index: NextPageWithLayout = () => {
  return (
    <Page />
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Index;  