const getData = () => {
  const getSubRedditFeed = async (Subreddit, SortType) => {
    let response;
    try {
      if (Subreddit) {
        response = await fetch(`https://www.reddit.com/r/${Subreddit}/${SortType}/.json`);
      } else {
        response = await fetch(`https://www.reddit.com/${SortType}/.json`);
      }

      if (!response.ok || !response) return;
      const responseJson = await response.json();
      if (responseJson.error === 404 || responseJson.message === 'Not Found' || responseJson.error === 302) return;

      console.log({ responseJson });
      const cleanedData = await Promise.all(
        responseJson.data.children.map(async (child) => {
          const postData = child.data;
          const url = `https://www.reddit.com/${postData.permalink}`;
          //console.log({ postData });
          return {
            title: postData.title,
            selftext: postData.selftext,
            author: postData.author,
            url: url,
            image: postData.url,
            score: postData.score,
            comments: await getPostComments(url),
            num_comments: postData.num_comments,
            subreddit: postData.subreddit,
            media: postData.media,
          };
        })
      );
      if (cleanedData === undefined) return;
      return {
        data: cleanedData,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: 'no results found!',
      };
    }
  };

  const getPostComments = async (url) => {
    try {
      const response = await fetch(url + '.json');
      if (!response.ok) return;
      const responseJson = await response.json();
      const data = await responseJson[1].data.children;
      return data;
    } catch (error) {
      console.log('Post meta could not be fetched');
    }
  };

  const SortType = {
    top: 'top',
    best: 'best',
    new: 'new',
    hot: 'hot',
    controversial: 'controversial',
    rising: 'rising',
  };

  return {
    getSubRedditFeed,
    SortType,
  };
};

export { getData };
