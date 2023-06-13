export function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

export function formatDate(date){
	return new Date(date).toLocaleDateString('en-US', {
		timeZone: "UTC",
	})
}