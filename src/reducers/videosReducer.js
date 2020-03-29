import { createSlice } from "@reduxjs/toolkit";
import { youtube } from "../api/youtube";
import { getVideoIds } from "../helpers/getVideoIds";

export const videos = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    relatedToVideos: []
  },
  reducers: {
    fetchSearchVideos: (state, action) => {
      state.videos = action.payload;
    },
    fetchPopularVideos: (state, action) => {
      state.videos = action.payload;
    },
    fetchRelatedToVideos: (state, action) => {
      state.relatedToVideos = action.payload;
    },
    resetRelatedVideos: state => {
      state.relatedToVideos = [];
    }
  }
});

export const {
  fetchSearchVideos,
  fetchRelatedToVideos,
  fetchRelatedToVideosStats,
  resetRelatedVideos
} = videos.actions;

export const fetchSearchVideosAsync = searchTerm => async dispatch => {
  const response = await youtube.get(
    `/search?part=snippet&maxResults=2&q=${searchTerm}%20&key=AIzaSyAP9SSWUPchFl90rFMhUupkYYGmxwJqwtY`
  );
  const videoIds = getVideoIds(response.data.items);
  const responseWithStats = await youtube.get(
    `/videos?part=snippet,statistics&id=${videoIds}&key=AIzaSyAP9SSWUPchFl90rFMhUupkYYGmxwJqwtY`
  );
  dispatch(fetchSearchVideos(responseWithStats.data.items));
};

export const fetchPopularVideosAsync = () => async dispatch => {
  const response = await youtube.get(
    `/videos?part=snippet,statistics&chart=mostPopular&maxResults=2&key=AIzaSyAP9SSWUPchFl90rFMhUupkYYGmxwJqwtY`
  );
  dispatch(fetchSearchVideos(response.data.items));
};

export const fetchRelatedToVideosAsync = videoId => async dispatch => {
  const response = await youtube.get(
    `/search?part=snippet&relatedToVideoId=${videoId}&maxResults=8&&type=video&key=AIzaSyAP9SSWUPchFl90rFMhUupkYYGmxwJqwtY`
  );
  const videoIds = getVideoIds(response.data.items);
  const responseWithStats = await youtube.get(
    `/videos?part=snippet,statistics&id=${videoIds}&key=AIzaSyAP9SSWUPchFl90rFMhUupkYYGmxwJqwtY`
  );
  dispatch(fetchRelatedToVideos(responseWithStats.data.items));
};

export const resetCurrentRelatedVideos = () => {
  return resetRelatedVideos();
};

export default videos.reducer;
