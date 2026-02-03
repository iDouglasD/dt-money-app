
import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes } from './public-routes/public-routes';
import { useCallback, useState } from 'react';
import { PrivateRoutes } from './private-routes/private-routes';
import { SystemBars } from 'react-native-edge-to-edge';

export function NavigationRoutes() {
  const [user, setUser] = useState(undefined)

  const Routes = useCallback(() => {
    return user ? <PrivateRoutes /> : <PublicRoutes />
  }, [user])

  return (
    <NavigationContainer>
      <SystemBars style={"light"} />
      <Routes />
    </NavigationContainer>
  )
}