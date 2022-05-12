import styled from 'styled-components';

type PropsTypeContainer = {
  showBackgroundColor: boolean;
};
export const Container = styled.div<PropsTypeContainer>`
  background-color: ${props =>
    props.showBackgroundColor ? '#1550ff' : '#e2e3e3'};
  height: 100px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type IconProps = {
  opacity?: number;
};
export const Icon = styled.img<IconProps>`
  width: 40px;
  height: 40px;
  opacity: ${props => (props.opacity ? props.opacity : 1)};
`;