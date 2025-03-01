import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  employeeButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tableContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    flex: 1,
    textAlign: "center",
  },
  tableData: {
    fontSize: 14,
    color: "#555",
    flex: 1,
    textAlign: "center",
  },
  optionText: {
    marginTop: 20,
    color: "#007BFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default styles;
