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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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

  const handleRegister = () => {
    if (!name || !email || !password || !confirm) {
      setError("⚠️ All fields are required");
      return;
    }
    if (password !== confirm) {
      setError("⚠️ Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("⚠️ Password must be at least 6 characters");
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
      source={{
        uri: "https://img.freepik.com/free-vector/mobile_677411-3439.jpg",
      }}
      style={styles.background}
    >
        <StatusBar style="light" />

        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png" }}
            style={styles.logo}
          />
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Animated.Text style={[styles.title, { opacity: fadeTitle }]}>
            ✨ Create Account
          </Animated.Text>

          <Animated.Text style={[styles.subtitle, { opacity: fadeSubtitle }]}>
            Join secure professional chats
          </Animated.Text>

          <Animated.View style={{ opacity: fadeCard }}>
            <View style={styles.card}>
              {/* Name */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#343e4e93"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Email */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>📧</Text>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#343e4e93"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#343e4e93"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#0f1c33ad"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔐</Text>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#343e4e93"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={confirm}
                  onChangeText={setConfirm}
                />
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              {/* Register Button */}
              <Animated.View style={{ transform: [{ scale: scaleButton }] }}>
                <TouchableOpacity
                  style={styles.button}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={handleRegister}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Login Link */}
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>
                  Already have an account?{" "}
                  <Text style={styles.linkBold}>Login</Text>
                </Text>
              </TouchableOpacity>

              <Text style={styles.privacy}>
                🔐 Your data is encrypted and protected
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

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#D1D5DB",
    textAlign: "center",
    marginBottom: 28,
  },

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
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: 14,
    marginBottom: 14,
  },

  inputIcon: { marginLeft: 12, marginRight: 8, fontSize: 18 },

  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 6,
    color: "#130909ff",
    fontSize: 15,
  },

  error: {
    color: "#EF4444",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },

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

  link: {
    color: "#F9FAFB",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 6,
  },

  linkBold: { color: "#1AE213", fontWeight: "700" },

  privacy: {
    fontSize: 12,
    color: "#f8fafdff",
    textAlign: "center",
    marginTop: 6,
  },
});
