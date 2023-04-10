import React from 'react';
import { routes } from '../routes';

function IndexPage() {
  return <></>;
}

export default IndexPage;

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: routes.cards,
      permanent: false,
    },
  };
}
