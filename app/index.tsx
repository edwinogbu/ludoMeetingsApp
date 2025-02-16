import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const onboardingScreen = () => {
  const router = useRouter();

  return (
    <Onboarding
      onSkip={() => router.replace("./signUpScreen")}
      onDone={() => router.replace("./signUpScreen")}
      containerStyles={{ backgroundColor: "#FFFFFF" }}
      titleStyles={styles.title} 
      subTitleStyles={styles.subtitle} 
      pages={[
        {
          backgroundColor: "#FFFFFF",
          image: (
            <View style={styles.imageContainer}>
              <Image source={require("../assets/images/logo-ludoconsult.png")} style={styles.logo} />
              <Text style={styles.companyName}>Ludo Consult</Text>
              <Image source={require("../assets/images/vid.jpg")} style={styles.image} />
            </View>
          ),
          title: "Welcome to Ludo Consult",
          subtitle: "Smart and seamless video conferencing for modern collaboration.",
        },
        {
          backgroundColor: "#FFEB3B",
          image: (
            <View style={styles.imageContainer}>
              <Image source={require("../assets/images/home-screen.png")} style={styles.logo} />
              <Text style={styles.companyName}>Ludo Consult</Text>
              <Image source={require("../assets/images/vid2.jpg")} style={styles.image} />
            </View>
          ),
          title: "Effortless Screen Sharing",
          subtitle: "Share your screen and collaborate in real time.",
        },
        {
          backgroundColor: "#4CAF50",
          image: (
            <View style={styles.imageContainer}>
              <Image source={require("../assets/images/home-screen.png")} style={styles.logo} />
              <Text style={styles.companyName}>Ludo Consult</Text>
              <Image source={require("../assets/images/vid.jpg")} style={styles.image} />
            </View>
          ),
          title: "Empower Your Meetings",
          subtitle: "Connect, collaborate, and create smarter solutions together.",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 15,
  },
  image: {
    width: width * 0.65,
    height: height * 0.35,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 10,
  },
});

export default onboardingScreen;



// import onboardingScreen from './onboardingScreen';

// export default onboardingScreen;
