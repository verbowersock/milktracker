import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItemType } from "../types";
import { format } from "date-fns";

const ListItem = ({ item }: { item: ListItemType }) => {
  //extract only time with date-fns

  const formattedTime = format(new Date(item.time), "HH:mm a");

  return (
    <View style={styles.container}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{formattedTime}</Text>
        <Text style={styles.itemText}>{item.duration}min</Text>
        <Text style={styles.itemText}>{item.volume}oz</Text>
      </View>
      <View style={styles.separator}></View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
  },
  itemTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  itemText: {
    fontSize: 16,
    margin: 10,
  },
  separator: {
    height: 1,
    width: "100%",
    alignSelf: "center",
  },
});
