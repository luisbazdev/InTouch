import '../styles/globals.css'

import { AuthProvider } from '../contexts/AuthContext'
import { GroupProvider } from '../contexts/GroupContext'
import { WelcomeProvider } from '../contexts/WelcomeContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GroupProvider>
        <WelcomeProvider>
          <Component {...pageProps} />
        </WelcomeProvider>
      </GroupProvider>
    </AuthProvider>
  )
}

export default MyApp
