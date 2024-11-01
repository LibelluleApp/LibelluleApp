import ApiManager from "../ApiManager";

async function fetchMenu(date) {
  try {
    console.log(date);
    const response = await ApiManager.post(`/meal/fetchmenu`, {
      date: date,
    });

    if (response.data.status === "success") {
      return response.data.menu;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer le menu. Veuillez réessayer.");
  }
}

module.exports = fetchMenu;
