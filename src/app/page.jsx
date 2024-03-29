'use client'
import { getWeatherData } from './actions'
import { useEffect, useState } from 'react'
import styles from '../styles/page.module.css'
import Temperature from '../components/temperature'

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

	const convertToCelcius = (temp) => (temp - 273).toFixed()

	return (
		<div className={styles.container}>
			<div className={styles.data}>
				<div className={styles.tempBox}>
					<Temperature temp={convertToCelcius(data.main.temp)} />
				</div>
			</div>
		</div>
	)
}

Page.displayName = 'Page'
export default Page
