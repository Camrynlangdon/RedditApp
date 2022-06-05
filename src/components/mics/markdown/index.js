import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import './styles.css';

const Container = styled.div`
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Markdown = ({ text, fontSize = '13px', color = 'white' }) => {
  return (
    <Container
      style={{
        color: color,
        fontSize: fontSize,
        wordBreak: 'break-word',
      }}
    >
      <ReactMarkdown children={text} className="reactMarkDown" />
    </Container>
  );
};

export default Markdown;
