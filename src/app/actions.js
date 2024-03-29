'use server'

export async function getWeatherData(city, country) {
	let result = { data: '34' }
	try {
		const res = await fetch(
			`${process.env.WEATHER_API_URL}/weather?q=${city},${country}&APPID=${process.env.WEATHER_API_KEY}`,
			{ cache: 'no-cache' }
		)
		result = res.json()
	} catch (error) {
		console.log(`Error while fetching weather data:\n`, error.message)
	} finally {
		return result
	}
}
