import { View, Text } from "react-native";
import { RouteNavigationParam } from "../functions/types";
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { getUserStatus } from "../functions/api";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import UserLockedPopup from "../components/PopupComponents/UserLockedPopup";
import { clearUserData, showToast } from "../functions/utils";
import { AppMode } from "../constant";
/*
 DashboardScreen functional component that takes navigation as a prop
*/
export default function DashboardScreen({ navigation }: RouteNavigationParam) {
  const [showUserLockedPopup, setShowUserLockedPopup] = useState(false);
  // State to store the activation status fetched from an API
  const [activationStatus, setActivationStatus] = useState<boolean>(true);
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterBold: Inter_700Bold,
  });
  // useEffect to fetch data from an API when the component mounts
  useEffect(() => {
    // Function to handle API data retrieval
    const handleApi = async () => {
      try {
        // Fetching data from the API using fetchData function
        const userStatus = await getUserStatus();
        // Setting the fetched data (activation status) to the state
        setActivationStatus(userStatus);
        // storeUser(parsedResult.data);
        if (AppMode === "dev") {
          console.log("activationstatus in dashboard :" + activationStatus);
        }
      } catch (error) {
        // Handling error if API call fails
        if (AppMode === "dev") {
          console.error("Error fetching data:", error);
        }
      }
    };

    // Calling the API handler function when the component mounts
    handleApi();

    // Set interval to fetch data every 2000ms (2 seconds)
    const interval = setInterval(handleApi, 10000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // useEffect to navigate to the 'Login' screen based on activationStatus changes
  useEffect(() => {
    // Navigating to 'Login' screen if activationStatus is false
    if (activationStatus === false) {
      showToast("Your account has been restricted by the administrator", 10000);
      setShowUserLockedPopup(true);
      clearUserData();
      navigation.navigate("Login");
    }
  }, [activationStatus, navigation]); // Dependency array watches changes in activationStatus and navigation

  if (fontsLoaded) {
    // Returning UI elements using React Native components
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* Text component displaying a welcome message */}
        <Text style={{ fontFamily: "InterBold" }}>
          Wellcome to Futsal Book your favorite playgroud
        </Text>
        {/* Icon component displaying a soccer ball icon */}
        <Icon name="soccer-ball-o" size={100} color="#000" />
        <UserLockedPopup
          isVisible={showUserLockedPopup}
          onClose={() => setShowUserLockedPopup(false)}
        />
      </View>
    );
  }
}
