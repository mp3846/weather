import styles from '../styles/location.module.css'

const Location = ({ city, country }) => (
	<div className={styles.container}>
		<div className={styles.positionWrapper}>
			<span className={styles.city}>{city}</span>
			<span className={styles.country}>{country}</span>
		</div>
	</div>
)

Location.displayName = 'Location'
export default Location
