const getData = () => {
  const getSubRedditFeed = async (Subreddit, SortType, currentSortTime) => {
    let response;
    try {
      if (Subreddit) {
        response = await fetch(`https://www.reddit.com/r/${Subreddit}/${SortType}/.json?t=${currentSortTime}`);
      } else {
        response = await fetch(`https://www.reddit.com/${SortType}/.json?t=${currentSortTime}`);
      }

      if (!response.ok || !response) return;
      const responseJson = await response.json();
      if (responseJson.error === 404 || responseJson.message === 'Not Found' || responseJson.error === 302) return;

      //console.log({ responseJson });
      const cleanedData = await Promise.all(
        responseJson.data.children.map(async (child) => {
          const postData = child.data;
          const url = `https://www.reddit.com/${postData.permalink}`;
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
            over_18: postData.over_18,
            all_awardings: postData.all_awardings,
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

  //https://www.reddit.com/subreddits/search.json?q=$a&include_over_18=on

  const search = async (query, searchPref, NSFW) => {
    let response;
    let requestNSFW = 'off';
    if (NSFW) {
      requestNSFW = 'on';
    }
    try {
      switch (searchPref) {
        case searchType.subredditName:
          response = await fetch(
            `https://www.reddit.com/api/search_reddit_names.json?query=${query}&include_over_18=${requestNSFW}`
          );
          break;
        case searchType.subredditStartsWith:
          response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${query}&include_over_18=${requestNSFW}`);
          break;
        default:
          return;
      }

      if (!response.ok || !response || response.error === 404) return;
      const responseJson = await response.json();

      if (responseJson.message === 'Not Found' || responseJson.error === 404) return;

      return {
        ...responseJson,
        search: query,
      };
    } catch (error) {
      return {
        data: null,
        error: 'no results found!',
      };
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

  const SortTimeFrame = {
    all: 'all',
    year: 'year',
    month: 'month',
    week: 'week',
    day: 'day',
    hour: 'hour',
  };

  const searchType = {
    //https://www.reddit.com/dev/api/#POST_api_search_subreddits
    subredditStartsWith: 'subreddit',
    subredditName: 'subredditName',
    user: 'user',
  };

  return {
    getSubRedditFeed,
    SortType,
    SortTimeFrame,
    search,
    searchType,
  };
};

export { getData };
