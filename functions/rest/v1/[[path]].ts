export async function onRequestGet({ request, env, params }) {
    const url = new URL(request.url);

    const cache = caches.default;
    const apiReq = new Request(`https://api.handball.ch${url.pathname}?${url.searchParams}`)
    
    let res = await cache.match(apiReq);
    if (!res) {

        res = await fetch(apiReq, {
            cf: {
                cacheTtl: 60,
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

    await cache.put(apiReq, response.clone());

    return response;
}
