import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Video = styled.video``;

const isImage = (image) => {
  if (image === undefined) return false;

  let isImages = true;
  if (Array.isArray(image)) {
    image.map((img) => {
      if (!isImage(img)) {
        isImages = false;
      }
    });
    if (isImages) return true;
  }
  if (
    image.slice(-3) === 'jpg' ||
    image.slice(-3) === 'jpeg' ||
    image.slice(-3) === 'gif' ||
    image.slice(-3) === 'png' ||
    (image.includes('imgur') && !image.slice(-4) === 'gifv')
  ) {
    return true;
  }
};

const Image = ({ post }) => {
  const ImageStyle = styled.img`
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
  if (!Array.isArray(post.image)) {
    return <ImageContainer>{isImage(post.image) && <ImageStyle src={post.image} alt={post.title} />}</ImageContainer>;
  }

  return (
    <div>
      {/* {post.image.map((image, i) => {
        return <ImageContainer key={i}>{isImage(image) && <ImageStyle src={image} alt={post.title} />}</ImageContainer>;
      })} */}
      <div>
        <ImageContainer>{isImage(post.image) && <ImageStyle src={post.image[0]} alt={post.title} />}</ImageContainer>
      </div>
    </div>
  );
};

const RedditVideo = ({ post }) => {
  return (
    <div>
      <Video autoPlay muted width="100%" controls src={post?.media?.reddit_video?.fallback_url} />
      {/* audio format https://v.redd.it/8zlpt3sr1l291/DASH_audio.mp4 */}
      {/* <Audio height="25" controls src="https://v.redd.it/8zlpt3sr1l291/DASH_audio.mp4"></Audio> */}
    </div>
  );
};

const GifV = ({ post }) => {
  return <Video width="100%" autoPlay muted loop controls src={post.image.replace('gifv', 'mp4')} />;
};

const GfyCat = ({ post }) => {
  const newLink = post.image.slice(0, 18) + '/ifr' + post.image.slice(18);
  return (
    <iframe
      width="100%"
      height="450px"
      src={newLink}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      aria-describedby="gif"
    />
  );
};

const YouTube = ({ post }) => {
  const getEmbedIdFromYoutubeUrl = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

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
      aria-describedby="YouTube video"
    />
  );
};

const Media = ({ post }) => {
  //console.log({ post });

  if (post.image) {
    if (isImage(post.image)) {
      return <Image post={post} />;
    } else if (post.image.slice(-4) === 'gifv') {
      return <GifV post={post} />;
    } else if (post.image.includes('gfycat')) {
      return <GfyCat post={post} />;
    } else if (post.image.includes('youtube') || post.image.includes('youtu.be')) {
      return <YouTube post={post} />;
    } else {
      if (post?.media?.reddit_video?.fallback_url) {
        return <RedditVideo post={post} />;
      }
    }
  }
};

export default Media;
