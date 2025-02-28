export const categories = ["Breakfast","Sandwiches", "Wraps", "Salads","Lunch","Bowl", "Desserts", "Drinks"];

export const foodData = {
  Breakfast: [
    { id: "1", name: "Rudy's Breakfast", price: "6", image: require("../images/rudys.jpeg"), description:"Comes with Hash brown, bacon, egg, cheese, and challa bun" },
    { id: "2", name: "Regular Breakfast", price: "11",image: require("../images/regularbreakfast.jpeg"),description:"Comes with two eggs, three piece bacon, home fries, two piece sausage, bread, and coffee" },
    { id: "3", name: "Hungry Man", price: "15",image: require("../images/hungryman.jpeg"), description:"Comes with three eggs, two piece bacon, two piece ham, two piece sausage, home fries and bread" },
    { id: "4", name: "Breakfast Poutine", price: "10",image: require("../images/poutine.jpeg"), description:"Comes with two eggs, two piece bacon, fries, two piece sausage, and gravy" },
    { id: "5", name: "Eggs Benedict", price: "15.69",image: require("../images/benedit.jpeg"), description:"Comes with two eggs, english muffin, two piece ham, home fries and hallundaise sauce" },
    { id: "6", name: "Egg Bagel", price: "4.36",image: require("../images/EggBagel.jpeg" ), description:"Comes with egg, bacon, cheese, bagel" },
  ],
  Sandwiches: [
    { id: "7", name: "Club House", price: "10.35",image: require("../images/ClubHouse.jpeg"), description:"Comes with mayo, turkey, bacon, cheese, tomato, lettuce, and bread" },
    { id: "8", name: "Reuben on Rye", price: "13.85",image: require("../images/reuben.jpeg"), description:"Comes with smoked meat, thousand island sauce, cheese, saurkrot, and rye bread" },
    { id: "9", name: "Smoked Meat Sandwich", price: "14.68",image: require("../images/smoked.jpeg"), description:"Comes with smoked meat, dijon sauce, cheese, and rye bread" },
    { id: "10", name: "Turkey Sandwich", price: "8.94",image: require("../images/turkey.jpeg"), description:"Comes with mayo, turkey, cheese, tomato, lettuce, and bread" },
    { id: "11", name: "Tuna Sandwich", price: "9.67",image: require("../images/tuna.jpeg"), description:"Comes with mayo, tuna, bacon, cheese, tomato, lettuce, and bread" },
    { id: "12", name: "BLT Sandwich", price: "7.58",image: require("../images/BLT.jpeg"), description:"Comes with mayo, bacon, cheese, tomato, lettuce, and bread"},
  ],
  Wraps: [
    { id: "13", name: "Rudy's Wrap", price: "12",image: require("../images/rudyswrap.jpeg"), description:"Comes with chicken, mayo, pickles, pepper, tomato, lettuce, and pita bread" },
    { id: "14", name: "Chicken Wrap", price: "12",image: require("../images/chickenwrap.jpeg"), description:"Comes with chicken, mayo, pickles, pepper, tomato, lettuce, and pita bread" },
    { id: "15", name: "Falafel Wrap", price: "12",image: require("../images/falafel.jpeg"), description:"Comes with falafel, mayo, pickles, pepper, tomato, lettuce, and pita bread" },
  ],
  Salads: [
    { id: "16", name: "Caesar Salad", price: "4",image: require("../images/Caesar.jpeg"), description:"Comes with caesar dressing, bacon, parmeson cheese, tomato, lettuce" },
    { id: "17", name: "Fattoush Salad", price: "6",image: require("../images/futtous.jpeg"), description:"Comes with vineger, pickles, pepper, tomato, lettuce, and onion" },
    { id: "31", name: "Taco Salad", price: "8.69",image: require("../images/taco.jpeg"), description:"Beef and beans mix over a garden salad covered in cheese" },
    ],
  Desserts: [
    { id: "18", name: "Cinnamon Roll", price: "2.98",image: require("../images/cinnamon.jpeg"), description:"Cinnamon, Cinnamon incream sandwich, cinnamon with cream" },
    { id: "19", name: "Muffin", price: "2.98",image: require("../images/muffin.jpeg"), description:"chocolate muffin, cranberry muffin, blueberry muffin, passion fruit" },
    { id: "20", name: "Pancake", price: "2.98",image: require("../images/pancake.jpeg"), description:"Comes with maple syrup" },
    { id: "21", name: "Waffle", price: "4.56",image: require("../images/waffle.jpeg"), description:"Comes with maple syrup" },
  ],
  Drinks: [
    { id: "22", name: "Iced Coffee", price: "3.65",image: require("../images/IceCoffee.jpeg"), description:"Comes with milk or cream, ice, and sugar or sweetner" },
    { id: "23", name: "Coffee", price: "3.65",image: require("../images/Coffee.jpeg"), description:"Comes with milk or cream, and sugar or sweetner" },
    { id: "24", name: "Shakes", price: "6.95",image: require("../images/shake.jpeg"), description:"Strawberry Shake, Chocolate Shake, and Vanilla Shake"},
  ],
  Lunch: [
    { id: "25", name: "Salmon Dinner", price: "18",image: require("../images/salmon.jpeg"), description:"Tender salmon paired with rice and a fresh salad for a balanced meal." },
    { id: "26", name: "Fried Chicken", price: "15",image: require("../images/friedchicken.jpeg"), description:"Rudy's Famous fried chicken served with hand cut fries" },
    { id: "27", name: "Mac and Cheese", price: "14",image: require("../images/mac.jpeg"), description:"Creamy macaroni smothered in rich, melted cheese for a comforting classic."},
    { id: "32", name: "Turkey Dinner", price: "9.85",image: require("../images/turkeydinner.jpeg"), description:"Home-cooked turkey with garlic mashed potatoes, homemade stuffing, vegetables , cranberries, and rich gravy." },
    { id: "33", name: "Butter Chicken", price: "6.85",image: require("../images/butterchicken.jpeg"), description:"Ginger, curry, sour cream, and garlic-seasoned chicken served with rice and salad." },
  ],
  Bowl: [
    { id: "28", name: "Beef Shawarma", price: "15",image: require("../images/beefs.jpeg"), description:"Beef and hummus, rice , fattoush, turnip and pita" },
    { id: "29", name: "Chicken Shawarma", price: "15",image: require("../images/chickens.jpeg"), description:"chicken and garlic, rice, Fattoush, turnip and pita" },
    { id: "30", name: "Shawarma Combo", price: "16",image: require("../images/shawrmacombo.jpeg"), description:"Shawarma chicken and beef, your choice of rice or fries and your choice of fattoush salad or tabbouleh, Comes with garlic and hummus, pita and turnip"},
  ],
};
