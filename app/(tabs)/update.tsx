import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

/* ---------- MOCK DATA ---------- */
const users = [
  {
    id: "1",
    name: "Amna Illyas",
    avatar: "https://i.pravatar.cc/150?img=21",
    statusImage: "https://brandemic.in/wp-content/uploads/2024/07/Top-15-AI-Tools-for-UI-UX-Design-for-Beginners-to-Master-2024.webp",
    time: "1h ago",
    description: "Started exploring AI-driven design tools for UI/UX improvements.",
  },
  {
    id: "2",
    name: "Usman Ali",
    avatar: "https://i.pravatar.cc/150?img=22",
    statusImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiSRzuqp-JGYqHh4utwS5wkjOhsMInjg9Njw&s",
    time: "2h ago",
    description: "Completed backend integration for a fintech project.",
  },
  {
    id: "3",
    name: "Sarah Khan",
    avatar: "https://i.pravatar.cc/150?img=23",
    statusImage: "https://cdn.sanity.io/images/9r24npb8/production/e2b09c13391e9a1df2a34289910770cb3d1cd857-1920x1080.webp?auto=format&fit=max&q=75&w=960",
    time: "3h ago",
    description: "Learning React Native animations and gesture handling.",
  },
  {
    id: "4",
    name: "Ali Raza",
    avatar: "https://i.pravatar.cc/150?img=24",
    statusImage: "https://media.geeksforgeeks.org/wp-content/uploads/20250825133452766889/cloud_computing_architecture.webp",
    time: "4h ago",
    description: "Exploring cloud solutions for scalable apps.",
  },
  {
    id: "5",
    name: "Ayesha Noor",
    avatar: "https://i.pravatar.cc/150?img=25",
    statusImage: "https://pressbooks.senecapolytechnic.ca/app/uploads/sites/140/2024/11/Collaborative-Writing-Workflow-1024x605.jpg",
    time: "5h ago",
    description: "Writing documentation for a collaborative AI project.",
  },
  {
    id: "6",
    name: "Hassan Qureshi",
    avatar: "https://i.pravatar.cc/150?img=26",
    statusImage: "https://dezyre.gumlet.io/images/blog/sql-query-optimization/image_887141306211723908638933.jpg?w=376&dpr=2.6",
    time: "6h ago",
    description: "Optimizing database queries for faster response times.",
  },
  {
    id: "7",
    name: "Zara Ahmed",
    avatar: "https://i.pravatar.cc/150?img=27",
    statusImage: "https://i.ytimg.com/vi/569fM_1o15g/maxresdefault.jpg",
    time: "7h ago",
    description: "Attending online AI workshop for natural language processing.",
  },
  {
    id: "8",
    name: "Bilal Khan",
    avatar: "https://i.pravatar.cc/150?img=28",
    statusImage: "https://productiveapp.io/assets/images/img_block1-5.png",
    time: "8h ago",
    description: "Working on personal productivity app with notifications.",
  },
  {
    id: "9",
    name: "Fatima Sheikh",
    avatar: "https://i.pravatar.cc/150?img=29",
    statusImage: "https://img-c.udemycdn.com/course/480x270/6351455_39e4_2.jpg",
    time: "9h ago",
    description: "Learning advanced JavaScript techniques for web projects.",
  },
  {
    id: "10",
    name: "Mariam Iqbal",
    avatar: "https://i.pravatar.cc/150?img=30",
    statusImage: "https://shadhinlab.com/wp-content/uploads/2025/03/best-AI-productivity-tools.png.webp",
    time: "10h ago",
    description: "Experimenting with AI chatbots for productivity tools.",
  },
];

export default function UpdateScreen() {
  const [myStatus, setMyStatus] = useState<string | null>(null);
  const [viewer, setViewer] = useState<any>(null);

  /* ---------- PICK IMAGE (CAMERA OR GALLERY) ---------- */
  const pickStatus = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [9, 16],
    });

    if (!result.canceled) {
      setMyStatus(result.assets[0].uri);
    }
  };

  /* ---------- HANDLE MY STATUS CLICK ---------- */
  const handleMyStatusPress = () => {
    if (myStatus) {
      setViewer({
        name: "My Status",
        statusImage: myStatus,
        time: "Just now",
        description: "Your recent update.",
      });
    } else {
      pickStatus();
    }
  };

  return (
    <LinearGradient colors={["#050944ff", "#382c06ff", "#15616eff"]} style={{ flex: 1 }}>
      <StatusBar style="light" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
        <Text style={styles.title}>Updates</Text>
      </View>

      {/* ---------- MY STATUS ---------- */}
      <View style={styles.myStatusContainer}>
        <TouchableOpacity style={styles.myStatusInfo} onPress={handleMyStatusPress}>
          <View style={[styles.myRing, { borderColor: myStatus ? "#10B981" : "#3B82F6" }]}>
            <Image
              source={{
                uri: myStatus || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx-Ngraa2znc5WcBHbfuWCXieGbcBMO8YbMw&s",
              }}
              style={styles.myAvatar}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.myName}>My Status</Text>
            <Text style={styles.mySub}>
              {myStatus ? "Tap to view your status" : "Tap to add status"}
            </Text>
          </View>
        </TouchableOpacity>
        
        {/* Separate Camera button to always allow uploading */}
        <TouchableOpacity onPress={pickStatus} style={styles.cameraIcon}>
          <Ionicons name="camera" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Updates</Text>

      {/* ---------- LIST ---------- */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.statusItem} onPress={() => setViewer(item)}>
            <View style={styles.statusRing}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message} numberOfLines={1}>
                {item.description || item.time}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* ---------- CENTERED STATUS VIEWER ---------- */}
      <Modal visible={!!viewer} animationType="fade" transparent={false}>
        <View style={styles.viewerBackground}>
          {/* Close Button at Top Right */}
          <TouchableOpacity style={styles.closeBtn} onPress={() => setViewer(null)}>
            <AntDesign name="close" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Centered Image and Content Area */}
          <View style={styles.centeredContent}>
            <Image source={{ uri: viewer?.statusImage }} style={styles.viewerImage} />
            
            <View style={styles.viewerTextContainer}>
              <Text style={styles.viewerName}>{viewer?.name}</Text>
              <Text style={styles.viewerTime}>{viewer?.time}</Text>
              {viewer?.description && (
                <Text style={styles.viewerDesc}>{viewer?.description}</Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 55,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  backButton: { padding: 5 },
  title: { color: "#fff", fontSize: 24, fontWeight: "700", marginLeft: 16 },

  myStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 14,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    paddingRight: 15,
  },
  myStatusInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    flex: 1,
  },
  myRing: {
    borderWidth: 2,
    borderRadius: 34,
    padding: 3,
    marginRight: 14,
  },
  myAvatar: { width: 60, height: 60, borderRadius: 30 },
  myName: { color: "#fff", fontSize: 16, fontWeight: "600" },
  mySub: { color: "#9CA3AF", fontSize: 13 },
  cameraIcon: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 12,
  },

  sectionTitle: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 18,
    marginVertical: 12,
  },

  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginHorizontal: 14,
    marginVertical: 4,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 18,
  },
  statusRing: {
    borderWidth: 2,
    borderColor: "#10B981",
    borderRadius: 32,
    padding: 3,
    marginRight: 14,
  },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  name: { color: "#fff", fontSize: 16, fontWeight: "600" },
  message: { color: "#9CA3AF", fontSize: 13, marginTop: 2 },

  /* CENTERED VIEWER STYLES */
  viewerBackground: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center", // Vertical centering
    alignItems: "center",     // Horizontal centering
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  centeredContent: {
    width: width,
    height: height * 0.8, // Takes up 80% of screen height to stay in mid-view
    justifyContent: "center",
    alignItems: "center",
  },
  viewerImage: {
    width: width * 0.95,
    height: "100%",
    borderRadius: 15,
    resizeMode: "contain", // Ensures the full image is visible in the center
  },
  viewerTextContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 12,
  },
  viewerName: { color: "#fff", fontSize: 20, fontWeight: "700" },
  viewerTime: { color: "#D1D5DB", fontSize: 14, marginTop: 4 },
  viewerDesc: { color: "#fff", fontSize: 16, marginTop: 8 },
});