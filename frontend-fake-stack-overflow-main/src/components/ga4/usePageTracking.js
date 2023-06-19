import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    // track pageview with gtag / react-ga / react-ga4, for example:
    if (process.env.NODE_ENV === 'production') {
      ReactGA.send('pageview')
    }
  }, [location])

  // useEffect(() => {
  //   // track user with gtag / react-ga / react-ga4, for example:
  //   if (process.env.NODE_ENV === 'production') {
  //     ReactGA.gtag('set', 'user_properties', { user_id: user?.username })
  //   }
  // }, [user])
}

export default usePageTracking
