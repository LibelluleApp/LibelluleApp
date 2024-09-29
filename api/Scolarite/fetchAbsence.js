import ApiManager from "../ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

function chooseSemester(groupe_id) {
  const options = { timeZone: 'Europe/Paris', year: 'numeric', month: 'numeric' };
  const currentDate = new Intl.DateTimeFormat('fr-FR', options).format(new Date());
  const [month, year] = currentDate.split('/').map(Number);

  let semester;
  const yearOffset = {
    Y1: 0,
    Y2: 2,
    Y3: 4
  };

  if (yearOffset[groupe_id.slice(0, 2)]) {
    const offset = yearOffset[groupe_id.slice(0, 2)];
    semester = month >= 9 ? `s${1 + offset}-${year}` : `s${2 + offset}-${year}`;
  }
  return semester;
}
async function fetchAbsence() {
  try {
    const user_data = JSON.parse(await AsyncStorage.getItem("user_data"));
    if (!user_data.email_edu) {
      throw new Error("L'adresse mail n'est pas défini dans AsyncStorage.");
    }
    let semestre = chooseSemester(user_data.groupe_id);
    const response = await ApiManager.post(`/scolarite/`, {
      email_edu: user_data.email_edu,
      semestre: semestre,
    });
    console.log(response);
    if (response.status === 200) {

      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    throw new Error("Impossible de récupérer les tâches. Veuillez réessayer.");
  }
}

export default fetchAbsence;
