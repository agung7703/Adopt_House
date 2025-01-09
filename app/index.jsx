import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {

  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();
  const router = useRouter();

  useEffect(() => {
    CheckNavLoaded();
  }, [])

  const CheckNavLoaded = () => {
    if (!rootNavigationState.key) return null;

    if (!user) {
      router.push('/login');
    }
  }

  // return (
  //   <View style={{
  //     flex: 1,
  //     paddingTop: 100
  //   }}>
  //     <Link href={'/login'}>
  //       <Text>CEk data</Text>
  //     </Link>
  //   </View>
  // );
  return user && (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={'/(tabs)/home'} /> : <Redirect href={'/login'} />}
    </View>
  );
}
