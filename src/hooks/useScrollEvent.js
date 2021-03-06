import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { throttle } from "lodash";

const useScrollEvent = (enableScrolling, data, domElement, action, ...args) => {
  const dispatch = useDispatch();
  const [element, setElement] = useState(null);
  useEffect(() => {
    setElement(document.getElementById(domElement));
    return () => {
      setElement(null);
    };
  }, [domElement]);
  useEffect(() => {
    if (enableScrolling) {
      document.addEventListener("scroll", throttledFunction, { passive: true });
      return () => {
        document.removeEventListener("scroll", throttledFunction);
      };
    }
  }, [data, element]);
  const trackScrolling = () => {
    if (isBottom(element)) {
      if (data.nextPageToken) {
        dispatch(action(data.nextPageToken, ...args));
        document.removeEventListener("scroll", throttledFunction);
      } else {
        document.removeEventListener("scroll", throttledFunction);
      }
    }
  };
  const throttledFunction = throttle(trackScrolling, 100);

  const isBottom = (el) => {
    if (data && el) {
      return el.getBoundingClientRect().bottom <= window.innerHeight + 100;
    }
  };
};

export default useScrollEvent;
