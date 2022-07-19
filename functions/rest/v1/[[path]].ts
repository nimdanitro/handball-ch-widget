export async function onRequestGet({ request, env, params }) {
    const url = new URL(request.url);

    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);

    let res = await cache.match(cacheKey);
    if (!res) {
        let apiReq = new Request(`https://api.handball.ch${url.pathname}?${url.searchParams}`)

        res = await fetch(apiReq, {
            cf: {
                cacheTtl: 5,
                cacheEverything: true,
            },
            headers: {
                "Authorization": `Basic ${env.API_KEY}`,
            }
        });

    }

    // Reconstruct the Response object to make its headers mutable.
    let response = new Response(res.body, res);

    // Set cache control headers to cache on browser for 60 minutes
    response.headers.set('Cache-Control', 'max-age=3600');

    await cache.put(cacheKey, response.clone());

    return response;
}
