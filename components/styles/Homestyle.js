import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
  searchButton: {
    padding: 5,
  },
  searchButtonText: {
    fontSize: 18,
  },
  categoriesList: {
    flexDirection: "row",
    marginBottom: 15,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: "#ff6f00",
    marginRight: 10,
    borderRadius: 8,
  },
  categoryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  foodItem: {
    marginRight: 15,
    alignItems: "center",
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  foodName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});
