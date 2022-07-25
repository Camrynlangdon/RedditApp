const getData = () => {
  const getSubRedditFeed = async (name, SortType, currentSortTime, currentSubType) => {
    let response;
    let feedType;
    console.log({ name, SortType, currentSortTime, currentSubType });
    try {
      if (currentSubType === searchType.user) {
        feedType = subType.user;
        response = await fetch(`https://www.reddit.com/user/${name}/.json?sort=${SortType}&t=${currentSortTime}`);
      } else if (name && currentSubType !== searchType.user) {
        feedType = subType.subreddit;
        response = await fetch(`https://www.reddit.com/r/${name}/${SortType}/.json?t=${currentSortTime}`);
      } else {
        feedType = subType.subreddit;
        response = await fetch(`https://www.reddit.com/${SortType}/.json?t=${currentSortTime}`);
      }
      if (!response.ok || !response) return;
      const responseJson = await response.json();
      if (responseJson.error === 404 || responseJson.message === 'Not Found' || responseJson.error === 302) return;
      if (responseJson.data.children === null || responseJson.data.children === undefined) return null;
      const cleanedData = await Promise.all(
        responseJson.data.children.map(async (child, i) => {
          if (currentSubType === searchType.user) {
            const post = await getPostById(child.data?.link_id || child.data?.id);
            if (!post) return null;
            const postData = post.post;
            const comments = post.comments;
            //console.log({ postData });
            return {
              title: postData.title,
              selftext: postData.selftext,
              author: postData.author,
              url: `https://www.reddit.com/${postData.permalink}`,
              image: getImages(postData.media_metadata) || postData.url,
              score: postData.score,
              comments: comments,
              num_comments: postData.num_comments,
              subreddit: postData.subreddit,
              media: postData.media,
              over_18: postData.over_18,
              all_awardings: postData.all_awardings,
              created_utc: postData.created_utc,
              UserPage: child.data,
            };
          } else {
            const postData = child.data;
            //console.log({ postData });
            const url = `https://www.reddit.com/${postData.permalink}`;
            return {
              title: postData.title,
              selftext: postData.selftext,
              author: postData.author,
              url: url,
              image: getImages(postData.media_metadata) || postData.url,
              score: postData.score,
              comments: await getPostComments(url),
              num_comments: postData.num_comments,
              subreddit: postData.subreddit,
              media: postData.media,
              over_18: postData.over_18,
              all_awardings: postData.all_awardings,
              created_utc: postData.created_utc,
            };
          }
        })
      );
      return {
        data: cleanedData.filter(Boolean),
        feedType: feedType,
        error: null,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        feedType: null,
        error: 'no results found!',
      };
    }
  };

  const getImages = (images) => {
    if (!images) return null;
    if (images.length === 1) return images;
    let imageCollection = Object.keys(images).map((image) => {
      return `https://i.redd.it/${image}.png`;
    });
    return imageCollection;
  };

  const getPostById = async (id) => {
    if (id === undefined) return null;
    if (id.includes('t3_')) {
      id = id.slice(-6);
    }
    try {
      const response = await fetch(`https://www.reddit.com/${id}/.json`);
      if (!response.ok) return;
      const responseJson = await response.json();

      return {
        post: responseJson[0].data.children[0].data,
        comments: responseJson[1].data.children,
      };
    } catch (error) {
      console.log('Post meta could not be fetched');
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

  const getUserFeed = async (User, SortType, currentSortTime) => {
    try {
      const response = await fetch(`https://www.reddit.com/user/${User}/${SortType}/.json?t=${currentSortTime}`);
      if (!response.ok) return;
      const responseJson = await response.json();
      const data = await responseJson[1].data.children;
      return data;
    } catch (error) {
      console.log('Post meta could not be fetched');
    }
  };

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
        case searchType.user:
          response = await fetch(`https://www.reddit.com/users/search.json?q=${query}`);
          break;
        default:
          return;
      }

      if (!response.ok || !response || response.error === 404) return;
      const responseJson = await response.json();
      //console.log({ responseJson });
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
    subreddit: 'subreddit',
    user: 'user',
  };

  const subType = {
    user: 'user',
    subreddit: 'subreddit',
  };

  return {
    getSubRedditFeed,
    SortType,
    SortTimeFrame,
    search,
    searchType,
    getUserFeed,
    subType,
  };
};

export { getData };
