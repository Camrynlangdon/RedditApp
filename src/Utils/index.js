const getData = () => {
  const getSubRedditFeed = async (currentSubreddit, searchType) => {
    try {
      const response = await fetch('https://www.reddit.com/r/' + currentSubreddit + `/${searchType}.json`);
      if (!response.ok) return;
      const responseJson = await response.json();
      if (responseJson.error === 404 || responseJson.message === 'Not Found') return;

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

  const searchTypes = {
    top: 'top',
    best: 'best',
    new: 'new',
    hot: 'hot',
    controversial: 'controversial',
    rising: 'rising',
  };

  return {
    getSubRedditFeed,
    searchTypes,
  };
};

export { getData };
