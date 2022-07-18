export async function onRequestGet({ request, env, params }) {
    const url = new URL(request.url);
    const apiReq = new Request(`https://api.handball.ch${url.pathname}?${url.searchParams}`)
    const res = await fetch(apiReq, {
        cf: {
            cacheTtl: 5,
            cacheEverything: true,
        },
        headers: {
            "Authorization": `Basic ${env.API_KEY}`,
        }
    });

    // Reconstruct the Response object to make its headers mutable.
    let response = new Response(res.body, res);

    // Set cache control headers to cache on browser for 25 minutes
    response.headers.set('Cache-Control', 'max-age=1500');
    return response;
}