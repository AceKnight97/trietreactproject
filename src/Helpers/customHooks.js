import { useRef, useState, useEffect } from 'react';
import _ from 'lodash';

export const useMergeState = (initialState) => {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => setState((prevState) => {
    const expectedState = _.assign(prevState, newState);
    return { ...expectedState };
  });
  return [state, setMergedState];
};

export const useUpdateEffect = (effect, dependencies = [], cleanup) => {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
    return cleanup;
  }, dependencies);
};
