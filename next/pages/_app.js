import '../styles/globals.css'

import { AuthProvider } from '../contexts/AuthContext'
import { GroupProvider } from '../contexts/GroupContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GroupProvider>
        <Component {...pageProps} />
      </GroupProvider>
    </AuthProvider>
  )
}

export default MyApp
