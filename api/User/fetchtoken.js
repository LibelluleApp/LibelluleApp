import ApiManager from "../ApiManager";

async function fetchToken(token) {
  try {
    const response = await ApiManager.post("/user/verifytoken", { token });
    return response.data;
  } catch (error) {
    console.error("Error while fetching token:", error);
    return { status: "error", message: "Could not fetch the token" };
  }
}

export default fetchToken;
