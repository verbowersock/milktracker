import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import List from "../../components/List";
import { SafeAreaView } from "react-native";
import Colors from "../../constants/Colors";
import { data } from "../../data";
import { Entypo } from "@expo/vector-icons";

export default function Pump() {
  const totalOz = data.reduce((total, item) => total + item.volume, 0);
  const totalDurationInMinutes = data.reduce(
    (total, item) => total + item.duration,
    0
  );
  const totalDurationInUnits = (duration: number) => {
    const days = Math.floor(duration / 1440);
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${days ? `${days} days` : ""} ${hours} hrs ${minutes} min`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          width: "100%",
          paddingHorizontal: 20,
          flex: 1,
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={styles.totals}
          lightColor={Colors.light.background}
          darkColor="rgba(255,255,255,0.1)"
        >
          <View style={styles.daysUntilContainer}>
            <Text style={styles.titleLarge}>Days until done: 114</Text>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.titleSmall}>
              <Entypo name="clock" size={20} color={Colors.light.tint} />{" "}
              {totalDurationInUnits(totalDurationInMinutes)}
            </Text>
            <Text style={styles.titleSmall}>
              <Entypo name="bucket" size={20} color={Colors.light.tint} />{" "}
              {totalOz}oz
            </Text>
          </View>
        </View>
        <List />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },
  titleLarge: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  titleSmall: {
    fontSize: 15,
    color: Colors.light.text,
  },
  totals: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  daysUntilContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  statsContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingBottom: 20,
  },
});
