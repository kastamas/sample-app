import styled from 'styled-components/native';

export const Wrapper = styled.View<{ height?: string }>`
  padding: 32px 16px;
  width: 100%;
  height: 450px;

  background-color: #ffffff;
  border-radius: 16px;

  position: absolute;
  bottom: 0;
  z-index: 2;
`;
