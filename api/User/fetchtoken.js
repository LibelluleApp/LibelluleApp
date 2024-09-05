import ApiManager from "../ApiManager";

async function fetchToken(token) {
  try {
    const response = await ApiManager.post("/user/verifytoken", { token });
    return response.data;
  } catch (error) {
    console.error("Error while fetching token:", error);
    return {
      status: "error",
      message: "Impossible de vérifier votre connection !",
    };
  }
}

export default fetchToken;
