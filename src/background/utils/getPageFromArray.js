export default (arr, pageSize, page, reverse = false) => {
	const length = arr.length;
	const total = Math.ceil(length / pageSize);

	if (!reverse) {
		const start = page * pageSize;
		const end = Math.min((page + 1) * pageSize, length);
		if (start >= length) {
			// throw new Error("Out of bounds");
			return {
				error: "Out of bounds",
				page,
				total,
			};
		}
		return {
			data: arr.slice(start, end),
			page,
			total,
		};
	} else {
		const start = Math.max(length - (page + 1) * pageSize, 0);
		const end = length - page * pageSize;
		if (end <= 0) {
			// throw new Error("Out of bounds");
			return {
				error: "Out of bounds",
				page,
				total,
			};
		}
		return {
			data: arr.slice(start, end).reverse(),
			page,
			total,
		};
	}
};
