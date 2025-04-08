/**
 * Global network request handler
 * @param {RequestInfo} url url to fetch
 * @param {RequestInit=} options fetch options
 * @returns json response
 */
const processFetchRequest = async (url, options) => {
	const ts = Date.now()
	const method = options?.method || 'GET'

	try {
		const controller = new AbortController()
		const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

		const response = await fetch(url, {
			...options,
			method,
			headers: {
				...options?.headers,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			// React Native specific options
			credentials: 'omit', // Avoid cookie handling issues
			mode: 'cors', // Enable CORS
			cache: 'no-cache', // Disable caching
			signal: controller.signal,
		})

		clearTimeout(timeoutId)

		const endpoint =
			url.match(/((?!\S+\s)?\S*[/].*?(?:\S+\s)?\S*[/])([\s\S]*)/)?.[2] || url

		console.log(
			`${method} ${response.status}: ${Date.now() - ts}ms /${endpoint}`
		)

		if (!response.ok) {
			const errorData = await response.text()
			throw new Error(
				`HTTP error! status: ${response.status}, message: ${errorData}`
			)
		}

		const data = await response.json()
		return data
	} catch (error) {
		if (error.name === 'AbortError') {
			throw new Error('Request timeout')
		}
		console.error('Network request failed:', {
			url,
			method,
			error: error.message,
		})
		throw error
	}
}

export default processFetchRequest
