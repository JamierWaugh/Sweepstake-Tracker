//Use a backoff and wait protocol to retry an async api call.

async function fetchWithRetry<T>(
    url: string,
    retries = 4, 
    delay = 1000,
): Promise<T> {
    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`HTTP Error: ${response.status} on ${url}`)
        }

        return await response.json() as T;
    } catch (error) {
        //If out of attempts, throw the final failure
        if (retries <= 1) throw error;

        console.warn(`Fetch failed for ${url}. Retrying in ${delay}ms...`, error)

        await new Promise(resolve => setTimeout(resolve, delay));

        return fetchWithRetry(url, retries -1, delay * 2);
    }
}

export default fetchWithRetry;