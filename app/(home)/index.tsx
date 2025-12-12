import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function Home(){
    return(
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subText}>Enjoy your time on our campus league management system.</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#fff" 
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#fff" 
                />
                <View style={{ width: "90%", alignItems: "flex-end" }}>
                    <TouchableOpacity style={styles.forgotPasswordBtn}>Forgot password?</TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button}>Login</TouchableOpacity>
                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between", width: "60%" }}    >
                    <Text style={{color: "#fff", fontStyle: "normal"}}>Dont have an account?</Text>
                    <TouchableOpacity>Contact Us</TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#004559",
        justifyContent: "center",
        alignItems: "center",
    },
    loginContainer:{
        backgroundColor: "#ffffff2d",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 20,
        width: 400,
        backdropFilter: "blur(50px)",
    },
    title:{
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    subText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#ffffff44",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        width: "90%",
    }, 
    forgotPasswordBtn:{
        color: "#fff",
        marginBottom: 20,
    },
    button:{
        backgroundColor: "#004559",
        padding: 13,
        color: "#fff",
        width: "90%",
        textAlign: "center",
        borderRadius: 10
    }

})