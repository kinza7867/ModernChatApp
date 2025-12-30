import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default function ContactInfoModal() {
  // 1. DYNAMIC DATA FETCHING
  const params = useLocalSearchParams();
  
  // Data fallbacks to ensure the screen never looks empty
  const currentName = params.name || params.userName || "Contact Info";
  const currentPhone = params.phone || params.userPhone || "Not Available";
  const currentAvatar = params.avatar;
  const currentBio = params.bio || "Available";

  return (
    <LinearGradient colors={["#0F2027", "#203A43", "#2C5364"]} style={styles.container}>
      <StatusBar style="light" />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-down" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Details</Text>
        <TouchableOpacity style={styles.moreBtn}>
          <Feather name="edit-3" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* --- PROFILE SECTION --- */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            {currentAvatar ? (
              <Image source={{ uri: currentAvatar as string }} style={styles.imageAvatar} />
            ) : (
              <LinearGradient colors={["#60A5FA", "#3B82F6"]} style={styles.gradientAvatar}>
                <Text style={styles.avatarText}>
                  {currentName.charAt(0).toUpperCase()}
                </Text>
              </LinearGradient>
            )}
            <View style={styles.onlineBadge} />
          </View>
          
          <Text style={styles.mainName}>{currentName}</Text>
          <Text style={styles.subStatus}>Online</Text>
        </View>

        {/* --- INFO CARD (Dynamic Content) --- */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionLabel}>CONTACT INFORMATION</Text>
          
          <View style={styles.dataRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="call-outline" size={20} color="#60A5FA" />
            </View>
            <View>
              <Text style={styles.dataLabel}>Mobile Number</Text>
              <Text style={styles.dataText}>{currentPhone}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.dataRow}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="briefcase-outline" size={20} color="#60A5FA" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.dataLabel}>Professional Bio</Text>
              <Text style={styles.dataText}>{currentBio}</Text>
            </View>
          </View>
        </View>

        {/* --- QUICK ACTION BUTTONS --- */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionCircle}>
              <Ionicons name="chatbubble-outline" size={24} color="#FFF" />
            </View>
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionCircle, { backgroundColor: '#10B981' }]}>
              <Ionicons name="videocam-outline" size={24} color="#FFF" />
            </View>
            <Text style={styles.actionText}>Video</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionCircle}>
              <Ionicons name="share-social-outline" size={24} color="#FFF" />
            </View>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* --- DANGER ZONE --- */}
        <TouchableOpacity style={styles.blockButton}>
          <Text style={styles.blockText}>Block {currentName}</Text>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "800", letterSpacing: 0.5 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  moreBtn: { width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

  scrollBody: { alignItems: 'center', paddingBottom: 60 },

  profileSection: { alignItems: 'center', marginTop: 20, marginBottom: 35 },
  avatarWrapper: { position: 'relative' },
  avatarCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  imageAvatar: { width: 130, height: 130, borderRadius: 65, borderWidth: 3, borderColor: 'rgba(255,255,255,0.2)' },
  gradientAvatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#FFF', fontSize: 50, fontWeight: '900' },
  onlineBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#203A43'
  },
  mainName: { color: '#FFF', fontSize: 28, fontWeight: '800', marginTop: 15 },
  subStatus: { color: '#10B981', fontSize: 15, fontWeight: '600', marginTop: 4 },

  infoCard: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  sectionLabel: { color: '#60A5FA', fontSize: 12, fontWeight: '900', marginBottom: 20, letterSpacing: 1.5 },
  dataRow: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(96, 165, 250, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  dataLabel: { color: '#94A3B8', fontSize: 12, fontWeight: '600', marginBottom: 2 },
  dataText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 18 },

  actionRow: { flexDirection: 'row', marginTop: 35, width: '85%', justifyContent: 'space-between' },
  actionItem: { alignItems: 'center' },
  actionCircle: {
    width: 60,
    height: 60,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 10
  },
  actionText: { color: '#FFF', fontSize: 13, fontWeight: '700' },

  blockButton: {
    marginTop: 40,
    width: '90%',
    padding: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)'
  },
  blockText: { color: '#EF4444', fontWeight: '800', fontSize: 15 }
});