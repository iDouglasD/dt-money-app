
import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes } from './public-routes/public-routes';
import { useCallback, useState } from 'react';
import { PrivateRoutes } from './private-routes/private-routes';
import { SystemBars } from 'react-native-edge-to-edge';
import { useAuth } from '@/shared/hooks/use-auth';
import { Loading } from '@/screens/loading';

export function NavigationRoutes() {
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth()
  const { token, user } = authUser

  const Routes = useCallback(() => {
    if (loading) return <Loading setLoading={setLoading} />
    if (!token || !user) return <PublicRoutes />
    return <PrivateRoutes />
  }, [user, token, loading])

  return (
    <NavigationContainer>
      <SystemBars style={"light"} />
      <Routes />
    </NavigationContainer>
  )
}