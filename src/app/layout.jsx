import '../styles/globals.css'
import styles from '../styles/layout.module.css'

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={styles.container}>{children}</body>
		</html>
	)
}

RootLayout.displayName = 'RootLayout'
