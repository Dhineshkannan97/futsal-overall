import { TouchableOpacity} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserLogInScreen from "./app/LoginScreen";
import DashboardScreen from "./app/DashBoard";
import UserRegisterScreen from "./app/RegisterScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { BackHandler } from "react-native";
import { useEffect, useState } from "react";
import ConfirmationPopup from "./components/PopupComponents/LogoutConformationPopup";
import { RouteNavigationParam } from "./functions/types";
import { clearUserData, getUser } from "./functions/utils";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { AppMode } from "./constant";
const Stack = createNativeStackNavigator();
// Default App function
export default function App() {
  const [userData, setUserData] = useState(null);
  // Call getUser when the component mounts to fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUser();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  // Loading fonts using useFonts hook
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterBold: Inter_700Bold,
  });

  // State to manage visibility of confirmation popup
  const [isConfirmationVisible, setConfirmationVisible] =
    useState<boolean>(false);
  const handleBackArrow = (navigation: RouteNavigationParam) => {
    // navigation.navigate("Login");
    BackHandler.exitApp();
  };
  // Function to handle logout
  const handleLogout = () => {
    setConfirmationVisible(true); // Display confirmation popup
  };

  // Function to handle logout confirmation
  const handleConfirm = (navigation: RouteNavigationParam) => {
    clearUserData(); // Clear user data (Assumed function, not defined in the code snippet)
    BackHandler.exitApp(); // Exit the app (Assumed function, not defined in the code snippet)
    navigation.navigate("Login"); // Navigate to the Login screen
    setConfirmationVisible(false); // Hide confirmation popup
  };

  // Function to handle cancellation of logout
  const handleCancel = () => {
    setConfirmationVisible(false); // Hide confirmation popup
  };

  // Check if fonts are loaded before rendering the app
  if (fontsLoaded) {
    return (
      // Render the NavigationContainer
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: "#77FF47" },
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "black",
              fontFamily: "InterBold", // Set header title font family
            },
          }}
          initialRouteName={userData?.status ? "Dashboard" : "Login"}
        >
          {/* Define different screens within the navigator */}
          <Stack.Screen
            name="Login"
            component={UserLogInScreen}
            options={{ headerBackVisible: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={({ navigation }) => ({
              // Configure header right with a logout button and confirmation popup
              headerBackVisible: false,
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 15 }}
                  onPress={() => {
                    handleLogout(); // Trigger logout process
                    if (AppMode === "dev") {
                      console.log("logout button clicked");
                    }
                  }}
                >
                  <Icon name="sign-out" size={24} color="black" />
                  <ConfirmationPopup
                    isVisible={isConfirmationVisible} // Pass visibility state to the confirmation popup
                    onConfirm={() => handleConfirm(navigation)} // Confirm logout action
                    onCancel={handleCancel} // Cancel logout action
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Register" component={UserRegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
