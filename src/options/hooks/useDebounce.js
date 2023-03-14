import { useEffect, useState } from "react";

const useDebounce = (state, delay) => {
	const [debouncedState, setDebouncedState] = useState(state);

	useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedState(state);
		}, delay);

		return () => clearTimeout(id);
	}, [state]);

	return debouncedState;
};

export default useDebounce;
