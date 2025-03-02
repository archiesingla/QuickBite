import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 15,
    color: "#333",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#ff6347",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  googleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4285F4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  employeeButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center", 
    marginTop: 10,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", 
    paddingHorizontal: 10,
  },
  findRestaurantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 50,
  },
  
  findRestaurant: {
    color: "#007BFF",
    fontSize: 14,
    textDecorationLine: "underline",
    marginRight: 1, 
  },
  
  locationIcon: {
    marginLeft: 0, 
  },
  
  
  
  optionText: {
    color: "#007BFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  resetButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  }
});

export default styles;
