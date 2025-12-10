import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function App() {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        // 1) Add a test doc
        await addDoc(collection(db, "tests"), {
          createdAt: new Date(),
          message: "Hello from Expo + Firebase",
        });

        // 2) Read docs
        const snapshot = await getDocs(collection(db, "tests"));
        snapshot.forEach((doc) => {
          console.log("DOC:", doc.id, doc.data());
        });
      } catch (error) {
        console.log("Firestore error:", error);
      }
    };

    testFirestore();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Campus Basketball League Manager 🏀</Text>
      <Text>Check your console for Firestore logs</Text>
    </View>
  );
}
