import { useMemo } from "react";

const useVisibleLength = (data) => {
	const visibleLength = useMemo(() => {
		if (!data || data.pages[0].error) return 0;
		return 50 * (data.pages.length - 1) + data.pages.at(-1).data.length;
	}, [data]);

	return visibleLength;
};

export default useVisibleLength;
