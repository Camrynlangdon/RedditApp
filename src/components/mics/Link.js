import styled from 'styled-components';

const StyledLink = styled.a`
  display: inline-flex;
  width: 200px;
  color: #5069d0;
  word-break: normal;
  :hover {
    color: #4c43cd;
  }
`;

const shortenLink = (link) => {
  if (link.includes(`https://`) && !link.includes(`redd`)) {
    const n = 25;
    return link.length > n ? link.substr(8, n - 1) + '....' : link;
  }
};

const isImage = (image) => {
  if (
    image.slice(-3) === 'jpg' ||
    image.slice(-3) === 'jpeg' ||
    image.slice(-3) === 'gif' ||
    image.slice(-3) === 'png' ||
    image.includes('gifv') ||
    image.includes('gfycat') ||
    image.includes('yout') ||
    image.includes(`redd`) ||
    image.includes('imgur')
  ) {
    return true;
  }
};

const Link = ({ href, text }) => {
  if (isImage(href)) return null;
  return (
    <StyledLink href={href} target="_blank">
      {shortenLink(text)}
    </StyledLink>
  );
};

export default Link;
