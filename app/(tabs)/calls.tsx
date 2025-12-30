import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert, // Added for alerts/menus
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// Removed unused BlurView import

const { width } = Dimensions.get("window");

/* ---------- MOCK DATA ---------- */
const CALL_DATA = [
  { id: "1", name: "Amna Illyas", type: "video", status: "missed", time: "10:45 AM", date: "Today", duration: "00:00", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: "2", name: "Usman Ali", type: "audio", status: "incoming", time: "Yesterday", date: "9:20 PM", duration: "12:45", avatar: "https://i.pravatar.cc/150?img=22" },
  { id: "3", name: "Client Group", type: "video", status: "outgoing", time: "Yesterday", date: "6:30 PM", duration: "45:10", avatar: "https://i.pravatar.cc/150?img=11", isGroup: true },
  { id: "4", name: "Sarah Khan", type: "audio", status: "missed", time: "Monday", date: "2:15 PM", duration: "00:00", avatar: "https://i.pravatar.cc/150?img=26" },
  { id: "5", name: "Design Team", type: "video", status: "incoming", time: "Monday", date: "11:00 AM", duration: "05:30", avatar: "https://i.pravatar.cc/150?img=12", isGroup: true },
  { id: "6", name: "Ali Raza", type: "audio", status: "outgoing", time: "Sunday", date: "8:45 PM", duration: "02:15", avatar: "https://i.pravatar.cc/150?img=24" },
  { id: "7", name: "Zara Ahmed", type: "video", status: "incoming", time: "Oct 12", date: "4:20 PM", duration: "18:20", avatar: "https://i.pravatar.cc/150?img=28" },
  { id: "8", name: "Hassan Qureshi", type: "audio", status: "missed", time: "Oct 10", date: "1:10 PM", duration: "00:00", avatar: "https://i.pravatar.cc/150?img=29" },
  { id: "9", name: "Fatima Sheikh", type: "video", status: "outgoing", time: "Oct 08", date: "9:00 AM", duration: "08:12", avatar: "https://i.pravatar.cc/150?img=30" },
  { id: "10", name: "Bilal Khan", type: "audio", status: "incoming", time: "Oct 05", date: "7:30 PM", duration: "11:55", avatar: "https://i.pravatar.cc/150?img=33" },
];

export default function CallsScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredCalls = useMemo(() => {
    return activeTab === "All" ? CALL_DATA : CALL_DATA.filter(c => c.status === "missed");
  }, [activeTab]);

  // Function to handle more options (three dots)
  const handleMoreOptions = () => {
    Alert.alert(
      "More Options",
      "Choose an action",
      [
        { text: "Clear Call Log", onPress: () => Alert.alert("Call log cleared!") }, // Placeholder functionality
        { text: "Settings", onPress: () => router.push("/settings") }, // Assume /settings route exists
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  // Function to handle dial pad FAB
  const handleDialPad = () => {
    router.push("/dialpad"); // Assume /dialpad route exists for keypad screen
  };

  // Function to handle call item press (e.g., redial or view details)
  const handleCallPress = (item) => {
    Alert.alert(
      `Call ${item.name}`,
      `Would you like to redial or view details?`,
      [
        { text: "Redial", onPress: () => console.log(`Redialing ${item.name}`) }, // Placeholder for redial logic
        { text: "View Details", onPress: () => router.push(`/call-details/${item.id}`) }, // Assume route for details
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.callCard} 
      activeOpacity={0.8}
      onPress={() => handleCallPress(item)} // Added functionality
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={[styles.statusIndicator, { backgroundColor: item.status === 'missed' ? '#EF4444' : '#10B981' }]} />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Text style={[styles.name, item.status === 'missed' && { color: '#F87171' }]} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        
        <View style={styles.row}>
          <View style={styles.statusBox}>
            <MaterialCommunityIcons 
              name={item.status === "incoming" ? "phone-incoming" : item.status === "outgoing" ? "phone-outgoing" : "phone-missed"} 
              size={14} 
              color={item.status === 'missed' ? '#EF4444' : '#9CA3AF'} 
            />
            <Text style={styles.statusText}>{item.status === 'missed' ? 'Missed' : item.duration}</Text>
          </View>
          <Ionicons name={item.type === 'video' ? 'videocam' : 'call'} size={18} color="#3B82F6" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#412c05ff", "#1d0e35c2", "#4f2c64ff"]} style={styles.container}>
      <StatusBar style="light" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calls Log</Text>
        <TouchableOpacity 
          style={styles.headerAction}
          onPress={handleMoreOptions} // Added functionality for three dots
        >
          <Feather name="more-vertical" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCalls}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* ---------- ANALYTICS CARD ---------- */}
            <View style={styles.analyticsCard}>
              <LinearGradient colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]} style={styles.glassEffect}>
                <View style={styles.statBox}>
                  <Text style={styles.statNum}>42</Text>
                  <Text style={styles.statLab}>Total</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={[styles.statNum, { color: '#F87171' }]}>8</Text>
                  <Text style={styles.statLab}>Missed</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={[styles.statNum, { color: '#60A5FA' }]}>15h</Text>
                  <Text style={styles.statLab}>Time</Text>
                </View>
              </LinearGradient>
            </View>

            {/* ---------- TABS ---------- */}
            <View style={styles.tabContainer}>
              {["All", "Missed"].map((tab) => (
                <TouchableOpacity 
                  key={tab} 
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={renderItem}
      />

      {/* ---------- DIAL PAD FAB ---------- */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.9}
        onPress={handleDialPad} // Added functionality for keypad
      >
        <MaterialCommunityIcons name="dialpad" size={24} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: 0.5 },
  headerAction: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },

  listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  
  analyticsCard: { height: 100, marginBottom: 25, marginTop: 10 },
  glassEffect: { flex: 1, borderRadius: 25, flexDirection: 'row', alignItems: 'center', padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statLab: { color: '#9CA3AF', fontSize: 12, marginTop: 2 },
  statDivider: { width: 1, height: '60%', backgroundColor: 'rgba(255,255,255,0.1)' },

  tabContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 15, padding: 5 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: '#3B82F6' },
  tabText: { color: '#9CA3AF', fontWeight: '600' },
  activeTabText: { color: '#fff' },

  callCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 22,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)'
  },
  avatarContainer: { position: 'relative' },
  avatar: { width: 55, height: 55, borderRadius: 20 },
  statusIndicator: { position: 'absolute', top: -2, right: -2, width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#1F2833' },
  
  contentContainer: { flex: 1, marginLeft: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name: { color: '#fff', fontSize: 16, fontWeight: '700' },
  time: { color: '#6B7280', fontSize: 11 },
  statusBox: { flexDirection: 'row', alignItems: 'center' },
  statusText: { color: '#9CA3AF', fontSize: 12, marginLeft: 5 },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }
  }
});