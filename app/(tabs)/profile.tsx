import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  // --- STATE FOR EDITABLE PROFILE ---
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Amna Illyas");
  const [role, setRole] = useState("Senior UI/UX Designer");
  const [about, setAbout] = useState("Designing digital experiences that are intuitive and impactful. Skilled in React Native, Figma, and high-fidelity prototyping.");
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=32");

  // --- IMAGE PICKER LOGIC ---
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "We need access to your gallery to change your picture.");
      return;
    }

    Alert.alert("Change Profile Picture", "Choose a source", [
      {
        text: "Camera",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
          if (!result.canceled) setProfileImage(result.assets[0].uri);
        }
      },
      {
        text: "Gallery",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
          if (!result.canceled) setProfileImage(result.assets[0].uri);
        }
      },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  return (
    <LinearGradient colors={["#0F2027", "#203A43", "#2C5364"]} style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        
        {/* ---------- HEADER ---------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/settings")} style={styles.iconBtn}>
            <Feather name="settings" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* ---------- AVATAR SECTION ---------- */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: profileImage }} style={styles.avatar} />
              <TouchableOpacity style={styles.editBadge} onPress={pickImage}>
                <Ionicons name="camera" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            {isEditing ? (
              <View style={styles.editInputsContainer}>
                <TextInput 
                  style={styles.inputName} 
                  value={name} 
                  onChangeText={setName} 
                  placeholder="Enter Name" 
                  placeholderTextColor="#9CA3AF"
                />
                <TextInput 
                  style={styles.inputRole} 
                  value={role} 
                  onChangeText={setRole} 
                  placeholder="Enter Role" 
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            ) : (
              <>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.role}>{role}</Text>
              </>
            )}
          </View>

          {/* ---------- STATS (Now with brighter accents) ---------- */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}><Text style={styles.statValue}>124</Text><Text style={styles.statLabel}>Chats</Text></View>
            <View style={[styles.statItem, styles.statBorder]}><Text style={styles.statValue}>58</Text><Text style={styles.statLabel}>Followers</Text></View>
            <View style={styles.statItem}><Text style={styles.statValue}>12</Text><Text style={styles.statLabel}>Projects</Text></View>
          </View>

          {/* ---------- ABOUT SECTION (Editable) ---------- */}
          <View style={styles.glassCard}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="account-details" size={20} color="#60A5FA" />
              <Text style={styles.cardTitle}>About Me</Text>
            </View>
            {isEditing ? (
              <TextInput 
                style={styles.inputAbout} 
                value={about} 
                onChangeText={setAbout} 
                multiline 
                placeholderTextColor="#9CA3AF"
              />
            ) : (
              <Text style={styles.aboutText}>{about}</Text>
            )}
          </View>

          {/* ---------- CONTACT (Display Only) ---------- */}
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionHeading}>Connect</Text>
            <View style={styles.infoRow}>
              <Feather name="mail" size={16} color="#60A5FA" style={styles.infoIcon} />
              <Text style={styles.infoText}>amna.ilyas@example.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Feather name="phone" size={16} color="#34D399" style={styles.infoIcon} />
              <Text style={styles.infoText}>+92 300 1234567</Text>
            </View>
          </View>

          {/* ---------- ACTION BUTTONS ---------- */}
          <TouchableOpacity 
            style={[styles.primaryButton, isEditing && styles.saveButton]} 
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons name={isEditing ? "checkmark-circle" : "create-outline"} size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>{isEditing ? " Save Profile" : " Edit Profile"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace("/(auth)/login")}>
            <Feather name="log-out" size={18} color="#F87171" />
            <Text style={styles.logoutText}> Logout</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  iconBtn: {
    width: 45,
    height: 45,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  profileHeader: { alignItems: "center", marginTop: 10, marginBottom: 25 },
  avatarWrapper: { position: "relative" },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: "#60A5FA" },
  editBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#3B82F6",
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#1F2833",
  },
  
  name: { fontSize: 26, fontWeight: "800", color: "#fff", marginTop: 15 },
  role: { fontSize: 15, color: "#9CA3AF", marginTop: 4 },
  
  editInputsContainer: { width: '100%', alignItems: 'center', marginTop: 15 },
  inputName: { color: '#fff', fontSize: 22, fontWeight: 'bold', borderBottomWidth: 1, borderColor: '#60A5FA', width: '80%', textAlign: 'center' },
  inputRole: { color: '#9CA3AF', fontSize: 16, marginTop: 8, borderBottomWidth: 1, borderColor: '#4B5563', width: '60%', textAlign: 'center' },

  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    paddingVertical: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  statItem: { flex: 1, alignItems: "center" },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  statValue: { color: "#fff", fontSize: 20, fontWeight: "800" },
  statLabel: { color: "#9CA3AF", fontSize: 12, marginTop: 4 },

  glassCard: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "700", marginLeft: 10 },
  aboutText: { color: "#D1D5DB", fontSize: 14, lineHeight: 22 },
  inputAbout: { color: "#D1D5DB", fontSize: 14, lineHeight: 22, borderBottomWidth: 1, borderColor: '#60A5FA' },

  detailsContainer: { marginBottom: 30 },
  sectionHeading: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 15, paddingLeft: 5 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 15,
    borderRadius: 18,
    marginBottom: 10,
  },
  infoIcon: { marginRight: 15 },
  infoText: { color: "#D1D5DB", fontSize: 14 },

  primaryButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 18,
    height: 58,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  saveButton: { backgroundColor: "#10B981" },
  primaryButtonText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  
  logoutButton: {
    flexDirection: 'row',
    marginTop: 15,
    height: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: { color: "#F87171", fontSize: 16, fontWeight: "600" },
});