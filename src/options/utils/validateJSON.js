import { Validator } from "jsonschema";

const validator = new Validator();

validator.customFormats.timestamp = (input) => {
	return !isNaN(Date.parse(input));
};

const schema = {
	type: "object",
	properties: {
		favourites: {
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "string" },
					timestamp: { type: "string", format: "timestamp" },
					title: { type: "string" },
					url: { type: "string" },
					favIconUrl: { type: "string" },
				},
				required: ["id", "timestamp", "title", "url"],
			},
		},
		history: {
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "string" },
					timestamp: { type: "string", format: "timestamp" },
					title: { type: "string" },
					url: { type: "string" },
					favIconUrl: { type: "string" },
				},
				required: ["id", "timestamp", "title", "url"],
			},
		},
		sessions: {
			type: "object",
			patternProperties: {
				"(.*?)": {
					type: "object",
					properties: {
						timestamp: { type: "string", format: "timestamp" },
					},
					patternProperties: {
						"^(?!(timestamp)$).*$": {
							type: "object",
							properties: {
								title: { type: "string" },
								url: { type: "string" },
								favIconUrl: { type: "string" },
							},
							required: ["title", "url"],
						},
					},
				},
			},
		},
	},
};

export default (input) => {
	return validator.validate(input, schema).valid;
};
