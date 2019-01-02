import SimpleSchema from 'simpl-schema';

SourceSchema = new SimpleSchema({
	objectID: {
		type: String,
		optional: true
	},
	type: {
		type: String,
		label: "Type of reference",
		min: 1, max: 300
	},
	authors: {
		type: Array
	},
	'authors.$': Object,
	'authors.$.first': { type: String, optional: true, label: 'First name', min: 1, max: 300 },
	'authors.$.last': { type: String, optional: true, label: 'Last name', min: 1, max: 300 },
	'authors.$.objectID': { type: String, optional: true },
	eds: { type: Boolean, optional: true },
	editors: {
		type: Array,
		optional: true
	},
	'editors.$': {
		type: Object, //_id
		optional: true
	},
	'editors.$.first': { type: String, label: 'Editors first name', optional: true },
	'editors.$.last': { type: String, label: 'Editors first name', optional: true },
	'editors.$.objectID': { type: String, optional: true },
	chapter: {
		type: String,
		optional: true
	},
	title: {
		type: String,
		min: 1, max: 1000
	},
	second: {
		type: String,
		optional: true,
		label: 'Second title',
	},
	periodical: {
		type: String,
		optional: true
	},
	date: {
		type: String,
		min: 1, max: 300
	},
	data: {
		type: String,
		optional: true
	},
	volum: {
		type: String,
		optional: true
	},
	issue: {
		type: String,
		optional: true
	},
	pages: {
		type: String,
		optional: true
	},
	url: {
		type: String,
		optional: true
	},
	location: {
		type: String,
		optional: true,
		label: 'Place Published',
	},
	publisher: {
		type: String,
		optional: true
	},
	accessed: {
		type: String,
		optional: true
	},
	keywords: {
		type: Array,
		optional: true,
		label: "Keywords"
	},
	'keywords.$': {
		type: String,
		optional: true,
	},
	abstract: {
		type: String,
		optional: true,
		label: "Abstract"
	},
	objectID: {
		type: String,
		optional: true,
	},
}).newContext();

export { SourceSchema }
