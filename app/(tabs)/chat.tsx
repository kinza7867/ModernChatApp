import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

/* ---------- MOCK DATA GENERATOR ---------- */
const names = [
  "Amna Illyas","Client Group","Design Team","Usman Ali","Sarah Khan", "Ali Raza","Ayesha Noor",
  "Hassan Qureshi","Zara Ahmed","Bilal Khan", "Fatima Sheikh","Mariam Iqbal","Omar Farooq","Noor Javed",
   "Ahmed Malik","Hira Qasim","Sami Khan","Maria Farooq","Rashid Ali", "Adeel Khan","Iqra Shah","Fahad Ahmed",
   "Amina Noor","Ali Haider", "Sara Nadeem","Zainab Ali","Hamza Riaz","Ayesha Fatima","Samiya Khan", "Usman Farooq",
   "Hassan Ali","Amna Zahra","Bilal Riaz","Noor Fatima", "Faraz Khan","Aisha Iqbal","Omar Shah","Zara Riaz","Ali Noor", 
   "Hira Ali","Ahmed Shah","Mariam Khan","Fatima Riaz","Usman Malik", "Adeel Farooq","Sara Ali","Zain Khan","Hassan Malik","Ayesha Shah"
];

const messages = ["Hey! How are you?", "Can you send the file?", "Let's meet tomorrow", "Seen 👍", "Voice call missed"];

const generateChats = () =>
  Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    name: names[i % names.length],
    message: messages[Math.floor(Math.random() * messages.length)],
    time: "2:45 PM",
    avatar: `https://i.pravatar.cc/150?img=${i + 20}`,
    unread: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0,
    isPinned: i < 5, 
  }));

export default function ChatScreen() {
  const [search, setSearch] = useState("");
  const allChats = useMemo(() => generateChats(), []);

  const filteredChats = allChats.filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const pinnedFriends = allChats.filter(c => c.isPinned);

  // Helper function for navigation
  const navigateToInbox = (person) => {
    router.push({
      pathname: "/chat_inbox",
      params: { name: person.name, avatar: person.avatar }
    });
  };

  return (
    <LinearGradient colors={["#05035cff", "#4d1d4aff", "#38440eff"]} style={{ flex: 1 }}>
      <StatusBar style="light" />

      {/* ---------- TOP BAR ---------- */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.title}>Messages</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
          <Image
            source={{ uri: "https://static.trustlocal.de/pros/372548/s_avatar_large" }}
            style={styles.myProfile}
          />
        </TouchableOpacity>
      </View>

      {/* ---------- SEARCH BOX ---------- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          placeholder="Search friends or groups..."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ---------- PINNED FRIENDS ---------- */}
      {search.length === 0 && (
        <View style={styles.pinnedSection}>
          <Text style={styles.sectionTitle}>Pinned Friends</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={pinnedFriends}
            keyExtractor={(item) => "pinned-" + item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.pinnedItem}
                onPress={() => navigateToInbox(item)} // FIX: Now passes person data
              >
                <View style={styles.pinnedAvatarContainer}>
                  <Image source={{ uri: item.avatar }} style={styles.pinnedAvatar} />
                  <View style={styles.onlineStatus} />
                </View>
                <Text style={styles.pinnedName} numberOfLines={1}>{item.name.split(' ')[0]}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* ---------- RECENT CHATS LIST ---------- */}
      <View style={styles.chatListContainer}>
        <View style={styles.chatListHeader}>
           <Text style={styles.sectionTitle}>Recent Chats</Text>
           <TouchableOpacity>
             <Text style={styles.seeAll}>See All</Text>
           </TouchableOpacity>
        </View>
        
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatCard}
              onPress={() => navigateToInbox(item)} // FIX: Now passes person data
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />

              <View style={{ flex: 1 }}>
                <View style={styles.chatRow}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.chatRow}>
                  <Text style={styles.message} numberOfLines={1}>
                    {item.message}
                  </Text>
                  {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ---------- BOTTOM NAVIGATION BAR ---------- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navTab} onPress={() => router.push("/(tabs)/chat")}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#3B82F6" />
          <Text style={[styles.navText, {color: '#3B82F6'}]}>Chats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navTab} onPress={() => router.push("/(tabs)/update")}>
          <MaterialCommunityIcons name="circle-slice-8" size={24} color="#9CA3AF" />
          <Text style={styles.navText}>Updates</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addBtn} onPress={() => router.push("/(tabs)/Add")}>
          <Feather name="plus" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navTab} onPress={() => router.push("/(tabs)/calls")}>
          <Ionicons name="call-outline" size={24} color="#9CA3AF" />
          <Text style={styles.navText}>Calls</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navTab} onPress={() => router.push("/(tabs)/settings")}>
          <Feather name="settings" size={24} color="#9CA3AF" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// ... styles remain same as your provided code ...
const styles = StyleSheet.create({
  topBar: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: { color: "#9CA3AF", fontSize: 14 },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  myProfile: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 2, borderColor: '#3B82F6' },

  searchContainer: {
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { color: "#fff", flex: 1, paddingVertical: 12, fontSize: 16 },

  pinnedSection: { paddingLeft: 20, marginBottom: 25 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 15 },
  
  pinnedItem: { marginRight: 20, alignItems: "center", width: 65 },
  pinnedAvatarContainer: { position: 'relative' },
  pinnedAvatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#3B82F6' },
  onlineStatus: { 
    position: 'absolute', 
    bottom: 2, 
    right: 2, 
    width: 14, 
    height: 14, 
    borderRadius: 7, 
    backgroundColor: '#10B981', 
    borderWidth: 2, 
    borderColor: '#203A43' 
  },
  pinnedName: { color: "#D1D5DB", fontSize: 12, marginTop: 8, fontWeight: '500' },

  chatListContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 25,
  },
  chatListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    alignItems: 'center',
    marginBottom: 10
  },
  seeAll: { color: '#3B82F6', fontSize: 14, fontWeight: '600' },

  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 4,
    borderRadius: 20,
  },
  avatar: { width: 55, height: 55, borderRadius: 27.5, marginRight: 15 },
  chatRow: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' },
  name: { color: "#fff", fontSize: 16, fontWeight: "700" },
  time: { color: "#9CA3AF", fontSize: 11 },
  message: { color: "#9CA3AF", marginTop: 4, fontSize: 14, flex: 0.9 },

  unreadBadge: {
    backgroundColor: "#3B82F6",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  unreadText: { color: "#fff", fontWeight: "bold", fontSize: 10 },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: 90,
    backgroundColor: "#112229",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
  },
  navTab: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 10, color: '#9CA3AF', marginTop: 4 },
  addBtn: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
});