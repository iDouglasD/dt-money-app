import { Register } from "@/screens/register/register";
import { SignIn } from "@/screens/sign-in/sign-in";
import { createStackNavigator } from "@react-navigation/stack";

export type PublicStackParamsList = {
  SignIn: undefined
  Register: undefined
}

export function PublicRoutes() {
  const PublicStack = createStackNavigator<PublicStackParamsList>();

  return (
    <PublicStack.Navigator screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="SignIn" component={SignIn} />
      <PublicStack.Screen name="Register" component={Register} />
    </PublicStack.Navigator>
  )
}