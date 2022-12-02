// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production

/** @type {import('./$types').PageServerLoad} */

import client from '../../sanityClient';

export async function load({ params }) {
	const id = params.id;
	const res = await client.fetch(`*[_type == "news" && _id == $id] [0]`, { id });

	return {
		props: { res }
	};
}
