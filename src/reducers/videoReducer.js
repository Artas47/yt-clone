import { createSlice } from "@reduxjs/toolkit";
import { youtube } from "../api/youtube";

export const currentVideo = createSlice({
  name: "currentVideo",
  initialState: {
    currentVideo: null
  },
  reducers: {
    fetchVideo: (state, action) => {
      state.currentVideo = action.payload;
    }
  }
});

const { fetchVideo } = currentVideo.actions;

export const fetchVideoAsync = videoId => async dispatch => {
  const response = await youtube.get(
    `/videos?part=snippet,statistics&id=${videoId}&key=AIzaSyAP9SSWUPchFl90rFMhUupkYYGmxwJqwtY`
  );
  dispatch(fetchVideo(response.data));
};

export default currentVideo.reducer;
