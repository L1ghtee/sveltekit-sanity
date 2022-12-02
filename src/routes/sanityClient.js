import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
	projectId: '0x1ug55c',
	dataset: 'production',
	apiVersion: '2021-10-21',
	useCdn: false
});

export default client;
// інтерпретуємо об'єкт зображення в посилання для source
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
