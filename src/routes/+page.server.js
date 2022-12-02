// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
/** @type {import('./$types').PageServerLoad} */

import client from './sanityClient';

export async function load() {
	const news = await client.fetch(`*[_type == "news"]{
		_id, name, image, previewTxt,
		category->
	}`);
	const category =await client.fetch(`*[_type == "category"]`);
	return {
		props: { news, category }
	};
}
