import styles from '../styles/temperature.module.css'

const Temperature = ({ temp }) => (
	<div className={styles.container}>
		{temp} <span className={styles.celcius}>°C</span>
	</div>
)

Temperature.displayName = 'Temperature'
export default Temperature
