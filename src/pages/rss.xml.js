import { getCollection, CollectionEntry } from 'astro:content';

import rss from '@astrojs/rss';
import { formatBlogPosts } from '../js/utils';

const postImportResult = await getCollection("blog");
const posts = formatBlogPosts(postImportResult);

export const get = () => rss({
	stylesheet: '/rss/styles.xsl',
	title: 'My Astro Blog',
	description: 'Blog app',
	site: import.meta.env.SITE,
	items: posts.map((post) => ({
		link: `/blog/${post.slug}`,
		title: post.data.title,
		pubDate: post.data.date,
		description: post.data.description,
		customData: `
			<author>${post.data.author}</author>
		`
	}))
})
