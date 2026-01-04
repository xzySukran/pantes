import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PoliDokterScreen from "../screens/PoliDokterScreen";
import RiwayatScreen from "../screens/RiwayatScreen";
import KonsultasiScreen from "../screens/KonsultasiScreen";
import InfoDokterScreen from "../screens/InfoDokterScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PoliDokter" component={PoliDokterScreen} />
      <Stack.Screen name="Riwayat" component={RiwayatScreen} />
      <Stack.Screen name="Konsultasi" component={KonsultasiScreen} />
      <Stack.Screen name="InfoDokter" component={InfoDokterScreen} />
    </Stack.Navigator>
  );
}
