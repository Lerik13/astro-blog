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

export function formatBlogPosts(posts, {
	filterOutDrafts = true,
	filterOutFuturePosts = true,
	sortByDate = true,
	limit = undefined,
} = {} ) {
	
	const filteredPosts = posts.reduce((acc, post) => {
		const { date, draft } = post.frontmatter;
		// filterOtDrafts if true
		if (filterOutDrafts && draft) return acc;
		
		// filterOutFuturePosts if true
		if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

		// add post to acc
		acc.push(post);

		return acc;

	}, [])

	if (sortByDate) {
		filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
	} else {
		// Randomize posts
		filteredPosts.sort(() => Math.random() - 0.5)
	}

	// limit if number is passed
	if (typeof limit === "number") {
		return filteredPosts.slice(0, limit)
	}
	return filteredPosts;
}