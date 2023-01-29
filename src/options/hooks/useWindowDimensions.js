import { useEffect, useState } from "react";

const useWindowDimensions = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [windowHeight, setWindowHeight] = useState(window.innerHeight);

	useEffect(() => {
		window.addEventListener("resize", (e) => {
			setWindowWidth(window.innerWidth);
			setWindowHeight(window.innerHeight);
		});
	}, []);

	return { windowWidth, windowHeight };
};

export default useWindowDimensions;
