import ApiManager from "../ApiManager";
import { getUserData } from "../../utils/storage";
import { Platform } from 'react-native';

async function handleUpload(uri) {
    try {
        const user_data = await getUserData();
        const formData = new FormData();

        formData.append('photo', {
            uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });
        formData.append('utilisateur_id', user_data.utilisateur_id);

        const response = await ApiManager.post('/user/profile-photo', formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Upload error:', error.response?.data || error);
        return 'Erreur : Impossible de mettre à jour la photo de profil';
    }
}

export default handleUpload;