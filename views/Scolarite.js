import React, { useContext, useState } from "react";
import { View, StyleSheet} from "react-native";
import { ThemeContext } from "../utils/themeContext";
import Dropdown from "../components/dropdown/Dropdown";
import Absence from "../components/scolarite/absence";
import Notes from "../components/scolarite/notes";

function Scolarite() {
    const { colors } = useContext(ThemeContext);
    const [selectedView, setSelectedView] = useState("absences");

    const options = [
        { label: "Mes absences", value: "absences" },
        { label: "Mes notes", value: "notes" },
    ];

    const styles = StyleSheet.create({
        modalBackground: {
            flex: 1,
            backgroundColor: colors.background,
        },
        modalDropdown: {
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
            paddingVertical: 10,
            zIndex: 999,
        },
    });

    const handleSelect = (value) => {
        setSelectedView(value);
    };

    return (
        <View style={styles.modalBackground}>
            <View style={styles.modalDropdown}>
                <Dropdown
                    options={options}
                    onSelect={handleSelect}
                    value={selectedView}
                />
            </View>
            {selectedView === "absences" && <Absence />}
            {selectedView === "notes" && <Notes />}
        </View>
    );
}

export default Scolarite;
