import React from 'react';
import {
  Caption,
  Headline1,
  MenuText,
  Subtitle1,
  Subtitle2,
  Text,
} from '@business-loyalty-program/ui-kit';
import { routes } from '../routes';

function IndexPage() {
  return (
    <>
      <Headline1>Headline 1</Headline1>
      <MenuText>Menu text</MenuText>
      <Subtitle1>Subtitle 1</Subtitle1>
      <Text>Text</Text>
      <Subtitle2>Subtittle 2</Subtitle2>
      <Caption>Caption</Caption>
    </>
  );
}

export default IndexPage;

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: routes.cards,
      permanent: true,
    },
  };
}
