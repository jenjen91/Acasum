import SimpleSchema from 'simpl-schema';

import { SourceSchema } from '../sources/schema.js';

MaterialSchema = new SimpleSchema({
	owner: {
		type: String,
		label: 'Owner'
	},
	creator: {
		type: String,
		label: 'Owner'
	},
	source: SourceSchema,
	createdAt: {
		type: String,
		optional: true
	},
	research_problem: {
		type: String,
		optional: true
	},
	purpose: {
		type: String,
		optional: true
	},
	research_question: {
		type: String,
		optional: true
	},
	main_claim: {
		type: String,
		optional: true
	},
}).newContext();

ReviewSchema = new SimpleSchema({
	problem: {
		type: String,
		optional: true
	},
	questions: {
		type: String,
		optional: true
	},
	purpose: {
		type: String,
		optional: true
	},
	significance: {
		type: String,
		optional: true
	},
	claim: {
		type: String,
		optional: true
	},
	theory: {
		type: String,
		optional: true
	},
	framework: {
		type: String,
		optional: true
	},
	design: {
		type: String,
		optional: true
	},
	sampling: {
		type: String,
		optional: true
	},
	collection: {
		type: String,
		optional: true
	},
	analyzing: {
		type: String,
		optional: true
	},
	results: {
		type: String,
		optional: true
	},
	limitations: {
		type: String,
		optional: true
	}
}).newContext();

export { MaterialSchema, ReviewSchema }
