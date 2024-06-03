import ApiManager from "../ApiManager";

async function fetchLinks() {
  try {
    const response = await ApiManager.post("/links/");

    return response.data.links;
  } catch (error) {
    console.error("Error fetching links:", error);
    return { status: "error", message: "Could not fetch the links" };
  }
}

export default fetchLinks;
