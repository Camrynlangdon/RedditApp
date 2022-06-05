import styled from 'styled-components';

const StyledLink = styled.a`
  display: inline-flex;
  width: 200px;
  color: #5069d0;

  :hover {
    color: #4c43cd;
  }
`;

const shortenLink = (link) => {
  if (link.includes(`https://`) && !link.includes(`redd`) && !link.includes('jpg')) {
    console.log(true, link);
    const n = 25;
    return link.length > n ? link.substr(8, n - 1) + '....' : link;
  }
};

const Link = ({ href, text }) => {
  return (
    <StyledLink href={href} target="_blank">
      {shortenLink(text)}
    </StyledLink>
  );
};

export default Link;
