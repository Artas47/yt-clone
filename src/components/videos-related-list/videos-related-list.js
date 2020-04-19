import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Styled from "./vidoes-related-list.styles";
import VideoRelatedItem from "../video-related-item/video-related-item";
import {
  fetchRelatedToVideosAsync,
  resetCurrentVideos,
  fetchRelatedToVideosNextPageAsync,
} from "../../reducers/relatedVideosReducer";
import useScrollEvent from "../../hooks/useScrollEvent";
import Spinner from "../spinner/spinner";
import CustomButton from "../custom-button/custom-button";
import {
  selectIsLoading,
  selectVideoItems,
} from "../../selectors/relatedVideos.selector";
import withError from "../../hocs/withError";

const VideosRelatedList = ({ enableScrollEvent }) => {
  const dispatch = useDispatch();
  const videos = useSelector(selectVideoItems);
  const isLoading = useSelector(selectIsLoading);
  const params = useParams();
  useEffect(() => {
    dispatch(fetchRelatedToVideosAsync(params.videoId));
    return () => {
      dispatch(resetCurrentVideos());
    };
  }, [params.videoId, dispatch]);
  useScrollEvent(
    enableScrollEvent,
    videos,
    "videos-related",
    fetchRelatedToVideosNextPageAsync,
    params.videoId
  );
  const renderMoreVideosButton = () => {
    return (
      <CustomButton
        onClick={() =>
          dispatch(
            fetchRelatedToVideosNextPageAsync(
              videos.nextPageToken,
              params.videoId
            )
          )
        }
        wideButton
      >
        SHOW MORE VIDEOS
      </CustomButton>
    );
  };
  const renderList = () => {
    if (!videos.items) {
      return <Spinner />;
    }
    return (
      <>
        <Styled.VideosRelatedText>Related videos</Styled.VideosRelatedText>
        {videos.items.map((video) => {
          return (
            <VideoRelatedItem
              key={video.id}
              id={video.id}
              title={video.snippet.title}
              imgUrl={video.snippet.thumbnails.medium.url}
              channelTitle={video.snippet.channelTitle}
              viewsCount={video.statistics.viewCount}
              publishDate={video.snippet.publishedAt}
            />
          );
        })}
      </>
    );
  };
  return (
    <Styled.VideosRelated
      enableScrollEvent={enableScrollEvent}
      id="videos-related"
    >
      {renderList()}
      {!enableScrollEvent && videos.items ? renderMoreVideosButton() : ""}
      {isLoading ? <Spinner /> : ""}
    </Styled.VideosRelated>
  );
};

export default withError(VideosRelatedList, "relatedVideos");

VideosRelatedList.propTypes = {
  enableScrollEvent: PropTypes.bool.isRequired,
};
