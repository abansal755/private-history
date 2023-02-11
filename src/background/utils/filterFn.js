export default (data, searchText) => {
	const filteredData = [];
	data.forEach((item) => {
		let { url, title } = item;
		url = url.toLowerCase();
		title = title.toLowerCase();
		const filter = searchText.toLowerCase();

		const urlIdx = url.indexOf(filter);
		const titleIdx = title.indexOf(filter);
		if (urlIdx !== -1 || titleIdx !== -1) {
			const newItem = { ...item };
			if (titleIdx !== -1)
				newItem.match = {
					type: "title",
					idx: titleIdx,
				};
			else if (urlIdx !== -1)
				newItem.match = {
					type: "url",
					idx: urlIdx,
				};
			filteredData.push(newItem);
		}
	});
	return filteredData;
};
