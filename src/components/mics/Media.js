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

const Video = styled.video``;

const isImage = (image) => {
  if (image.slice(-3) === 'jpg' || image.slice(-3) === 'gif') {
    return true;
  }
};

const getEmbedIdFromYoutubeUrl = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

const Media = ({ post }) => {
  if (isImage(post.image)) {
    return <ImageContainer>{isImage(post.image) && <Image src={post.image} alt={post.title} />}</ImageContainer>;
  } else if (post?.media?.reddit_video?.fallback_url) {
    return (
      <div>
        <Video width="100%" controls src={post?.media?.reddit_video?.fallback_url} />
        {/* audio format https://v.redd.it/8zlpt3sr1l291/DASH_audio.mp4 */}
        {/* <Audio height="25" controls src="https://v.redd.it/8zlpt3sr1l291/DASH_audio.mp4"></Audio> */}
      </div>
    );
  } else if (post.image.slice(-4) === 'gifv') {
    return <Video width="100%" autoPlay muted loop controls src={post.image.replace('gifv', 'mp4')} />;
  } else if (post.image.includes('gfycat')) {
    const newLink = post.image.slice(0, 18) + '/ifr' + post.image.slice(18);
    return (
      <iframe
        width="100%"
        height="300px"
        src={newLink}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        aria-describedby="descriptionText"
      />
    );
  } else if (post.image.includes('youtube') || post.image.includes('youtu.be')) {
    const newLink = getEmbedIdFromYoutubeUrl(post.image);
    return (
      <iframe
        width="100%"
        height="300px"
        src={`https://www.youtube.com/embed/${newLink}?loop=1&rel=0&border=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        aria-describedby="descriptionText"
      />
    );
  }
};
//pBuB6BC6ISk
//Hqfsukw9S6Y
//https://www.youtube.com/embed/$Hqfsukw9S6Y?loop=1&rel=0&border=0

export default Media;
