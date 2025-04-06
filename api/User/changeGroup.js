import ApiManager from "../ApiManager";

import {getUserData} from "../../utils/storage";

async function changeGroupe(newGroup) {
    try {
        const user_data = getUserData();
        if (!user_data.utilisateur_id) {
            throw new Error("L'utilisateur id n'est pas défini dans AsyncStorage.");
        }

        const response = await ApiManager.post(`/user/changegroup`, {
            utilisateur_id: user_data.utilisateur_id,
            groupe_id: newGroup,
        });
        if (response.status === 200) {
            return response.data.message;
        } else {
            throw new Error(response);
        }
    } catch (error) {
        throw new Error(
            error.response.data || "Erreur lors de la mise à jour du groupe."
        );
    }
}

export default changeGroupe;
