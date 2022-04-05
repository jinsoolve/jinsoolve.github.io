import { ColorMode, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface BodyProps {
  content: string;
}

interface ContentProps {
  colorMode: ColorMode;
}

const Content = styled.article<ContentProps>`
  position: relative;
  margin-bottom: 100px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    margin-top: 45px;
    margin-bottom: 5px;
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 26px;
  }

  h3 {
    font-size: 23px;
  }

  p {
    font-size: 18px;
    margin-top: 28px;

    img {
      margin-bottom: 20px;
    }
  }

  blockquote {
    background-color: ${props => props.colorMode === 'dark' ? 'rgba(251, 211, 141, 0.16)': 'rgb(254, 235, 200)'};
    border-inline-start-width: 4px;
    border-inline-start-color: ${props => props.colorMode === 'dark' ? 'var(--chakra-colors-orange-200)' : 'var(--chakra-colors-orange-500)'};
    border-radius: 5px;

    p {
      padding: 10px;
    }
  }

  a {
    text-decoration: underline;
    color: #0a91ff;

    :hover {
      color: #0a91ffa6;
    }
  }

  ul {
    position: relative;
    left: 10px;
    padding: 10px;
  }
`;

const PostContentBody = ({ content }: BodyProps) => {
  const { colorMode } = useColorMode();
  return <Content colorMode={colorMode} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default PostContentBody;
