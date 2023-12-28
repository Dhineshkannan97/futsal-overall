import { AppMode } from "../constant";
import { getUser, updateUserStatusInStorage } from "./utils";
//for dashboardscreen
export const getUserStatus = async () => {
  try {
    const userData = await getUser(); // Retrieve user data
    if (userData && userData != null) {
      const userId = userData.userId; // Assuming your user object has an 'id' field
      if (AppMode === "dev") {
        console.log("from getuser asynstroge" + userId);
      }
      // Use the obtained userId in the API request
      const response = await fetch(
        `http://192.168.2.106:8081/api/admin/activationStatus?id=${userId}`
      );
      if (AppMode === "dev") {
        console.log("Response status in getuserstatus api :" + response.status);
      }
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const userStatus = await response.json();
      // updateUserStatusInStorage(userStatus);
      return userStatus;
    } else {
      if (AppMode === "dev") {
        console.log("User data not found or is missing the ID");
      }
      return null; // Return null if user data doesn't exist or is missing the ID
    }
  } catch (error) {
    if (AppMode === "dev") {
      console.error("Error fetching data:", error);
    }
    return null; // Return null in case of an error
  }
};

//for login and register screen
export const apiGetUserData = async (
  dataToSend: Record<string, any>,
  actionType: any
): Promise<string> => {
  try {
    let url = "";
    let defaultMessage = "";

    if (actionType === "login") {
      url = "http://192.168.2.106:8081/api/users/login";
      defaultMessage = "Login Failed new";
    } else if (actionType === "register") {
      url = "http://192.168.2.106:8081/api/users/register";
      defaultMessage = "Register Failed";
    } else {
      throw new Error("Unsupported action type");
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(dataToSend);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);
    if (AppMode === "dev") {
      console.log("Response status:", response.status);
    }
    const result = await response.text();
    if (AppMode === "dev") {
      console.log("Result:", result);
    }
    const responseMessage: string = result;
    if (AppMode === "dev") {
      console.log("Response message:", responseMessage);
    }
    return responseMessage || defaultMessage;
  } catch (error) {
    if (AppMode === "dev") {
      console.log("Error:", error);
    }
    return "Failed to perform action";
  }
};
