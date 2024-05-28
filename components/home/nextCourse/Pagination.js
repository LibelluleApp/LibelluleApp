import React from "react";
import { StyleSheet } from "react-native";
import { Pagination, PaginationProps } from "react-native-swiper-flatlist";

const styles = StyleSheet.create({
  paginationContainer: {
    bottom: -20,
    marginVertical: 10,
  },
  pagination: {
    borderRadius: 10,
    width: 10,
    height: 8,
    marginHorizontal: 5,
  },
  paginationActive: {
    borderRadius: 10,
    width: 15,
    height: 8,
  },
});

export const CustomPagination = (props) => {
  return (
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationDefaultColor="#0760FB50"
      paginationActiveColor="#0760FB"
      paginationStyleItemActive={styles.paginationActive}
    />
  );
};
