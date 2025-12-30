import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const fadeTitle = useRef(new Animated.Value(0)).current;
  const fadeSubtitle = useRef(new Animated.Value(0)).current;
  const fadeCard = useRef(new Animated.Value(0)).current;
  const scaleButton = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(fadeTitle, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(fadeSubtitle, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(fadeCard, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      setError("⚠️ Email and password are required");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("⚠️ Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("⚠️ Password must be at least 6 characters long");
      return;
    }
    setError("");
    router.replace("/(tabs)/chat");
  };

  const handlePressIn = () => {
    Animated.spring(scaleButton, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleButton, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <ImageBackground
      source={{ uri: "https://img.freepik.com/free-vector/mobile_677411-3439.jpg" }}
      style={styles.container}
      resizeMode="cover"
    >

        {/* Top Bar */}
        <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png" }}
            style={styles.logo}/>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Animated.Text style={[styles.title, { opacity: fadeTitle }]}>
            👋 Welcome Back
          </Animated.Text>

          <Animated.Text style={[styles.subtitle, { opacity: fadeSubtitle }]}>
            Login to continue chatting
          </Animated.Text>

          <Animated.View style={{ opacity: fadeCard }}>
            <View style={styles.card}>
              {/* Email Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>📧</Text>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#9CA3AF"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              {/* Login Button */}
              <Animated.View style={{ transform: [{ scale: scaleButton }] }}>
                <TouchableOpacity
                  style={styles.button}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Sign Up Link */}
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text style={styles.link}>
                  Don’t have an account? <Text style={styles.linkBold}>Sign up</Text>
                </Text>
              </TouchableOpacity>

              {/* Privacy Info */}
              <Text style={styles.privacy}>
                🔒 We value your privacy. Strong passwords are required.
              </Text>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24 },
  topBar: {
    marginTop: Platform.OS === "ios" ? 54 : 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  logo: { width: 40, height: 40 },
  keyboardContainer: { flex: 1, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "700", color: "#FFFFFF", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 15, color: "#D1D5DB", textAlign: "center", marginBottom: 28 },
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1.5,
    borderColor: "#3B82F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    marginBottom: 14,
  },
  inputIcon: { fontSize: 18, marginLeft: 10, marginRight: 6 },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 6,
    color: "#FFFFFF",
    fontSize: 15,
  },
  error: { color: "#EF4444", fontSize: 13, marginBottom: 10, textAlign: "center" },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 14,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  link: { color: "#fcfdfdff", textAlign: "center", fontSize: 14, marginBottom: 6 },
  linkBold: { color: "#1AE213", fontWeight: "700" },
  privacy: { fontSize: 12, color: "#f2f4f7ff", textAlign: "center", marginTop: 6 },
});
