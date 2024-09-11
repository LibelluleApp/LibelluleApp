import ApiManager from "../ApiManager";

async function fetchMenu(date) {
  try {
    const response = await ApiManager.post(`/meal/fetchmenu`, {
      date: date,
    });

    if (response.data.status === "success") {
      return response.data.menu;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer le menu. Veuillez réessayer.");
  }
}

module.exports = fetchMenu;
