'use client'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import weatherData from '../weather.data.json'
import styles from '../styles/citySelector.module.css'

const Option = ({ innerProps, isDisabled, children }) =>
	isDisabled ? null : (
		<div className={styles.customOption} {...innerProps}>
			<span>{children}</span>
		</div>
	)

const { cities } = weatherData

const CitySelector = ({ onLocationChange }) => {
	const [options, setOptions] = useState([])
	const [selectedOption, setSelectedOption] = useState(null)

	useEffect(() => {
		setOptions(cities.map((c) => ({ value: c.name, label: `${c.name}, ${c.country}` })))
	}, [])

	const handleChange = (option) => {
		onLocationChange({ city: option.value, country: option.label.split(',')[1].trim() })
		setSelectedOption(option)
	}

	return (
		<div className={styles.container}>
			<Select
				instanceId='34' // Set a random id to avoid error => "Prop `id` did not match"
				value={selectedOption}
				options={options}
				onChange={handleChange}
				components={{ Option }}
				styles={{
					control: (base) => ({
						...base,
						backgroundColor: 'transparent',
						padding: '0.3rem 0.5rem',
						border: 'none',
						boxShadow: 'none'
					}),
					input: (base) => ({ ...base, color: 'white' }),
					menu: (base) => ({
						...base,
						background: '#00000090'
					}),
					menuList: (base) => ({
						...base,
						padding: '0',
						maxHeight: '18rem',
						backdropFilter: `blur(10px)`
					}),
					singleValue: (base) => ({ ...base, color: 'white' }),
					dropdownIndicator: (base) => ({ ...base, color: 'white' }),
					placeholder: (base) => ({ ...base, color: 'white' })
				}}
			/>
		</div>
	)
}

CitySelector.displayName = 'CitySelector'
export default CitySelector
