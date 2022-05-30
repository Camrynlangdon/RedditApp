import { Box, Text } from '@chakra-ui/react';
import styled from 'styled-components';

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 2px;

  @media only screen and (max-width: 614px) {
     {
      width: 100%;
    }
  }
  @media only screen and (min-width: 615px) {
     {
      max-height: 900px;
      max-width: 95%;
    }
  }
`;

const isImage = (image) => {
  if (image.slice(-3) === 'jpg' || image.slice(-3) === 'gif') {
    return true;
  }
};

const Player = ({ video }) => {
  if (video.slice(-4) === 'gifv') {
    let videoURL = video.replace('.gifv', '.mp4');
    return <video src={videoURL} />;
  } else return <video src={video} />;
};

const Media = ({ post }) => {
  if (isImage(post.image)) {
    return <ImageContainer>{isImage(post.image) && <Image src={post.image} alt={post.title} />}</ImageContainer>;
  } else if (post?.media?.reddit_video?.fallback_url) {
    console.log(post.media.reddit_video.fallback_url);
    <video height={100} width={100} title={'test'} src={'https://v.redd.it/8zlpt3sr1l291/DASH_1080.mp4?source=fallback.mp4'} />;
  }
};

export default Media;
