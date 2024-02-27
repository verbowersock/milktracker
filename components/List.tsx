import React from "react";
import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "./Themed";
import ListItem from "./ListItem";
import { ListItemType } from "../types";
import { format, parseISO } from "date-fns"; // Import the necessary functions from date-fns
import { ThemeProvider } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { data } from "../data";

interface Groups {
  [key: string]: ListItemType[];
}

// Group data by date
const groupedData = data.reduce((groups: Groups, item: ListItemType) => {
  const dateWithDayName = format(parseISO(item.time), "EEE, MMM d yyyy");
  if (!groups[dateWithDayName]) {
    groups[dateWithDayName] = [];
  }
  groups[dateWithDayName].push(item);
  //sort grouped data by date
  return groups;
}, {});

// Convert the groupedData object to an array
const groupedDataArray = Object.entries(groupedData);

// Sort the array by date
groupedDataArray.sort(
  (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
);

// Convert the sorted array back to an object
const sortedGroupedData = Object.fromEntries(groupedDataArray);

// Calculate the total duration for each date
const totalDurationForDate = Object.entries(groupedData).reduce(
  (totals: { [key: string]: number }, [date, items]) => {
    totals[date] = items.reduce((total, item) => total + item.duration, 0);
    return totals;
  },
  {}
);

// Calculate the total oz for each date
const totalOzForDate = Object.entries(groupedData).reduce(
  (totals: { [key: string]: number }, [date, items]) => {
    totals[date] = items.reduce((total, item) => total + item.volume, 0);
    return totals;
  },
  {}
);

// Calculate the total items for each date
const dateItemCount = Object.entries(groupedData).reduce(
  (totals: { [key: string]: number }, [date, items]) => {
    totals[date] = items.length;
    return totals;
  },
  {}
);

const List = () => {
  return (
    <View style={styles.container}>
      {Object.entries(sortedGroupedData).map(([date, items]) => (
        <View key={date} style={styles.dayContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.detailsText}>
              {dateItemCount[date]}/{totalDurationForDate[date]}min
            </Text>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.detailsText}>{totalOzForDate[date]}oz</Text>
          </View>
          {items.map((item) => (
            <ListItem key={item.time} item={item} />
          ))}
        </View>
      ))}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dayContainer: {
    borderWidth: 1,
    borderColor: "lightgrey",
    elevation: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 20,
    color: Colors.light.background,
    alignSelf: "center",
    paddingVertical: 8,
    fontWeight: "bold",
  },
  detailsText: {
    fontSize: 15,
    color: Colors.light.background,
    alignSelf: "center",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: Colors.light.tint,
  },
});
