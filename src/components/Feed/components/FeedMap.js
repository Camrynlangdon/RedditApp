import FeedComponent from './Feed';
import NSFWToggleButton from '../../mics/NSFWToggle';
import BottomBanner from './../components/BottomBanner';
import SortTypeDropdown from './../components/SortTypeDropdown';
import styled from 'styled-components';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;

  overflow-y: auto;
  background-color: rgb(35, 35, 35);
  border: 1px solid;
  border-color: rgb(80, 80, 80);

  margin-bottom: 15px;
  color: inherit;
  font: inherit;

  outline: inherit;
  @media only screen and (max-width: 614px) {
     {
      width: 100%;
    }
  }
  @media only screen and (min-width: 615px) {
     {
      max-width: 800px;
      border-radius: 4px;
    }
  }
`;

const TopNav = styled.div`
  width: 100%;
  padding: 2px 10px 2px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0px 15px 0px;

  background-color: rgb(35, 35, 35);
  border: solid 1px rgb(80, 80, 80);
  border-radius: 4px;
`;

const FeedContainer = styled.div`
  padding-top: 8px;
`;

const SearchError = styled.p`
  color: red;
  margin-top: 3px;
  margin-left: 5px;
`;

const FeedMap = ({
  posts,
  searchError,
  currentSearchType,
  changeCurrentSortType,
  changeCurrentSortTime,
  currentSortTime,
  showNSFW,
  setShowNSFW,
  currentSubreddit,
  ChangeSubreddit,
  setCurrentSelectedPostAndKey,
}) => {
  return (
    <FeedContainer>
      <SearchError>{searchError}</SearchError>
      <TopNav>
        <SortTypeDropdown
          currentSearchType={currentSearchType}
          setCurrentSortType={(type) => changeCurrentSortType(type)}
          currentSortType={currentSearchType}
          setCurrentSortTime={(value) => changeCurrentSortTime(value)}
          currentSortTime={currentSortTime}
        />

        <NSFWToggleButton setShowNSFW={(bool) => setShowNSFW(bool)} isChecked={showNSFW} />
      </TopNav>
      {(() => {
        if (!posts || !posts.length) {
          return null;
        } else {
          return (
            <div>
              {posts.map((post, key) => {
                if (post.over_18 && !showNSFW) return null;
                return (
                  <PostContainer key={key}>
                    <div>
                      <FeedComponent
                        post={post}
                        currentSubreddit={currentSubreddit}
                        ChangeSubreddit={(value) => ChangeSubreddit(value)}
                        setCurrentSelectedPostAndKey={(post) => setCurrentSelectedPostAndKey(post)}
                      />
                    </div>
                    <BottomBanner post={post} setCurrentSelectedPostAndKey={(value) => setCurrentSelectedPostAndKey(value)} />
                  </PostContainer>
                );
              })}
            </div>
          );
        }
      })()}
    </FeedContainer>
  );
};

export default FeedMap;
