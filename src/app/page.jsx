'use client'
import { getWeatherData } from './actions'
import { useEffect, useState } from 'react'
import styles from '../styles/page.module.css'
import Temperature from '../components/temperature'
import Location from '../components/location'
import CitySelector from '../components/citySelector'

const tokens = {
	200: {
		image: 'thunderstorm.png',
		deg: 0,
		gradColor1: '#09284750',
		gradColor2: 'transparent',
		depth: 10
	},
	300: {
		image: 'drizzle.jpg',
		deg: 0,
		gradColor1: '#50536150',
		gradColor2: 'transparent',
		depth: 10
	},
	500: {
		image: 'light_rain.jpg',
		deg: 0,
		gradColor1: '#50536150',
		gradColor2: 'transparent',
		depth: 10
	},
	600: {
		image: 'light_snow.jpg',
		deg: 0,
		gradColor1: '#09284750',
		gradColor2: 'transparent',
		depth: 10
	},
	700: {
		image: 'clear_sky.jpg',
		deg: 0,
		gradColor1: '#09284750',
		gradColor2: 'transparent',
		depth: 10
	},
	800: {
		image: 'clear_sky.jpg',
		deg: 0,
		gradColor1: '#09284750',
		gradColor2: 'transparent',
		depth: 10
	},
	801: {
		image: 'clear_sky.jpg',
		deg: 0,
		gradColor1: '#09284750',
		gradColor2: 'transparent',
		depth: 10
	}
}

const initialData = {
	name: 'London',
	main: { temp: 273 },
	sys: { country: 'GB' },
	weather: [{ description: 'clear sky', id: 200 }]
}

const Page = () => {
	const [data, setData] = useState(initialData)
	const [city, setCity] = useState(initialData.name)
	const [country, setCountry] = useState(initialData.sys.country)

	const getData = async () => {
		try {
			const data = await getWeatherData(city, country)
			if (!data.name) throw new Error('Connection issues')
			setData(data)
		} catch (error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		getData()
	}, [city, country])

	const handleLocationChange = (location) => {
		setCity(location.city)
		setCountry(location.country)
	}

	const convertToCelcius = (temp) => (temp - 273).toFixed()

	const weatherCode = Math.floor(data.weather[0].id / 100) * 100

	return (
		<div className={styles.container}>
			<div
				className={styles.weatherImage}
				style={{ background: `url('/images/${tokens[weatherCode].image}')` }}></div>
			<div
				className={styles.wrapper}
				style={{
					background: `linear-gradient(${tokens[weatherCode].deg}deg, ${tokens[weatherCode].gradColor1} ${tokens[weatherCode].depth}%, ${tokens[weatherCode].gradColor2})`
				}}>
				<div className={styles.header}>
					<span>Weather</span>
				</div>
				<CitySelector onLocationChange={handleLocationChange} />
				<div className={styles.data}>
					<div className={styles.tempBox}>
						<Location city={data.name} country={data.sys.country} />
						<Temperature temp={convertToCelcius(data.main.temp)} />
						<span className={styles.weatherDesc}>{data.weather[0].description}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

Page.displayName = 'Page'
export default Page
