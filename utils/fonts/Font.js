import { loadAsync } from "expo-font";

const loadFonts = async () =>
  await loadAsync({
    Ubuntu_300Light: require("../../assets/fonts/Ubuntu-Light.ttf"),
    Ubuntu_300Light_Italic: require("../../assets/fonts/Ubuntu-LightItalic.ttf"),
    Ubuntu_400Regular: require("../../assets/fonts/Ubuntu-Regular.ttf"),
    Ubuntu_400Regular_Italic: require("../../assets/fonts/Ubuntu-Italic.ttf"),
    Ubuntu_500Medium: require("../../assets/fonts/Ubuntu-Medium.ttf"),
    Ubuntu_500Medium_Italic: require("../../assets/fonts/Ubuntu-MediumItalic.ttf"),
    Ubuntu_700Bold: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntu_700Bold_Italic: require("../../assets/fonts/Ubuntu-BoldItalic.ttf"),
    SFProDisplay_400Regular: require("../../assets/fonts/SFProDisplay-Regular.ttf"),
    SFProDisplay_500Medium: require("../../assets/fonts/SFProDisplay-Medium.ttf"),
    SFProDisplay_700Bold: require("../../assets/fonts/SFProDisplay-Bold.ttf"),
  });

export default loadFonts;
