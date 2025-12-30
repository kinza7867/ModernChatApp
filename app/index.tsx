import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { router } from "expo-router";

export default function Index() {
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const fadeTitle = useRef(new Animated.Value(0)).current;
  const fadeSubtitle = useRef(new Animated.Value(0)).current;
  const fadeDesc = useRef(new Animated.Value(0)).current;
  const fadeButton = useRef(new Animated.Value(0)).current;

  const slideLogo = useRef(new Animated.Value(-30)).current;
  const slideTitle = useRef(new Animated.Value(-30)).current;
  const slideSubtitle = useRef(new Animated.Value(-30)).current;
  const slideDesc = useRef(new Animated.Value(-30)).current;
  const slideButton = useRef(new Animated.Value(30)).current;

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeLogo, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideLogo, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeTitle, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(slideTitle, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeSubtitle, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(slideSubtitle, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeDesc, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(slideDesc, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(fadeButton, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideButton, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <ImageBackground 
      source={{ uri: "https://applescoop.org/image/wallpapers/iphone/16351802643746012-44363943420495642.png" }} 
      style={styles.container}
      resizeMode="cover"
    >
      
      
        <View style={styles.content}>
          {/* Logo */}
          <Animated.Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png" }}
            style={[
              styles.logo,
              {
                opacity: fadeLogo,
                transform: [{ translateY: slideLogo }],
              },
            ]}
          />

          {/* App Name */}
          <Animated.Text
            style={[
              styles.title,
              { opacity: fadeTitle, transform: [{ translateY: slideTitle }] },
            ]}
          >
            Modern Chat
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text
            style={[
              styles.subtitle,
              { opacity: fadeSubtitle, transform: [{ translateY: slideSubtitle }] },
            ]}
          >
            Fast • Secure • Real-Time
          </Animated.Text>

          {/* Description */}
          <Animated.Text
            style={[
              styles.description,
              { opacity: fadeDesc, transform: [{ translateY: slideDesc }] },
            ]}
          >
            A next-generation chat experience designed for speed, privacy, and
            seamless communication across all your devices.
          </Animated.Text>

          {/* Get Started Button */}
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }, { translateY: slideButton }],
              opacity: fadeButton,
              width: '100%',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/(auth)/login")}
              activeOpacity={0.9}
              style={styles.buttonWrapper}
            >
              <LinearGradient
                colors={["#3B82F6", "#2563EB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryText}>Get Started</Text>
                <View style={styles.iconCircle}>
                   <Text style={{color: '#FFF', fontWeight: 'bold'}}>→</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Secondary Button */}
          <Animated.View
            style={{ opacity: fadeButton, transform: [{ translateY: slideButton }] }}
          >
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.secondaryText}>
                Already have an account? <Text style={styles.loginLink}>Log In</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  logo: { 
    width: 110, 
    height: 110, 
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: { 
    fontSize: 36, 
    fontWeight: "900", 
    color: "#FFFFFF", 
    marginBottom: 8, 
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: { 
    fontSize: 16, 
    color: "#60A5FA", 
    fontWeight: "600",
    marginBottom: 24,
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  description: { 
    fontSize: 15, 
    color: "#D1D5DB", 
    textAlign: "center", 
    lineHeight: 24, 
    marginBottom: 60, 
    paddingHorizontal: 15 
  },
  buttonWrapper: { width: '85%' },
  primaryButton: {
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  iconCircle: {
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  primaryText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", textAlign: "center" },
  secondaryButton: { marginTop: 25, paddingVertical: 10 },
  secondaryText: { color: "#edf0f5ff", fontSize: 14, textAlign: "center" },
  loginLink: { color: "#6cf18eff", fontWeight: "700" },
});