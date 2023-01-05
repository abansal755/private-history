const SearchText = ({ item, type, searchText }) => {
	if (!item.match || item.match.type !== type) return item[type];

	return (
		<span>
			{item[type].slice(0, item.match.idx)}
			<b>
				{item[type].slice(
					item.match.idx,
					item.match.idx + searchText.length
				)}
			</b>
			{item[type].slice(item.match.idx + searchText.length)}
		</span>
	);
};

export default SearchText;
