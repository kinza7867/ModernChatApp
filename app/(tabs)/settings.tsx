import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
  Animated,
  Vibration,
  Platform,
  Dimensions,
  Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function SettingsScreen() {
  // --- 1. INDEPENDENT STATES (Full Mode Support) ---
  const [theme, setTheme] = useState<"dark" | "light" | "neutral">("dark");
  const [isNotifOn, setIsNotifOn] = useState(true);
  const [isReceiptsOn, setIsReceiptsOn] = useState(true);
  const [isTwoStepOn, setIsTwoStepOn] = useState(false);
  const [isBiometricOn, setIsBiometricOn] = useState(false);
  
  // --- 2. FUNCTIONAL STATES ---
  const [fontSize, setFontSize] = useState<"Small" | "Medium" | "Large">("Medium");
  const [chatWallpaper, setChatWallpaper] = useState("Default Abstract");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // --- 3. ANIMATIONS ---
  const toastAnim = useRef(new Animated.Value(0)).current;
  const [toastText, setToastText] = useState("");

  // --- 4. DYNAMIC COLOR ENGINE ---
  const getThemeColors = () => {
    switch (theme) {
      case "light":
        return { 
          bg: ["#F9FAFB", "#F3F4F6"], 
          text: "#111827", 
          card: "#FFFFFF", 
          sub: "#6B7280", 
          accent: "#3B82F6",
          border: "#E5E7EB" 
        };
      case "neutral":
        return { 
          bg: ["#1e2731ff", "#2e5270ff"], 
          text: "#FFFFFF", 
          card: "rgba(255,255,255,0.15)", 
          sub: "#D1D5DB", 
          accent: "#10B981",
          border: "rgba(255,255,255,0.1)" 
        };
      default: // Dark
        return { 
          bg: ["#090a0aff", "#0d0d0eff", "#080808ff"], 
          text: "#FFFFFF", 
          card: "rgba(255,255,255,0.1)", 
          sub: "#9CA3AF", 
          accent: "#60A5FA",
          border: "rgba(255,255,255,0.05)"
        };
    }
  };

  const colors = getThemeColors();

  const showToast = (msg: string) => {
    setToastText(msg);
    Vibration.vibrate(Platform.OS === 'android' ? 30 : 0);
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1800),
      Animated.timing(toastAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: "Join me on this secure chat app! It's amazing." });
    } catch (e) { console.log(e); }
  };

  return (
    <LinearGradient colors={colors.bg} style={styles.container}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      {/* --- DYNAMIC HEADER --- */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        {!isSearching ? (
          <>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={28} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
            <TouchableOpacity onPress={() => setIsSearching(true)} style={styles.iconBtn}>
              <Ionicons name="search" size={24} color={colors.text} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
            <Ionicons name="search" size={20} color={colors.sub} />
            <TextInput
              autoFocus
              placeholder="Search settings..."
              placeholderTextColor={colors.sub}
              style={[styles.searchInput, { color: colors.text }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={() => { setIsSearching(false); setSearchQuery(""); }}>
              <Ionicons name="close-circle" size={24} color={colors.sub} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
        
        {/* --- ACCOUNT --- */}
        <TouchableOpacity 
          style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]} 
          onPress={() => setActiveModal("profile")}
        >
          <LinearGradient colors={["#3B82F6", "#2563EB"]} style={styles.avatar}>
            <Text style={styles.avatarText}>AI</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={[styles.name, { color: colors.text }]}>Amna Illyas</Text>
            <Text style={{ color: colors.sub }}>+92 300 1234567 • Account</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.sub} />
        </TouchableOpacity>

        {/* --- APPEARANCE --- */}
        <Text style={[styles.sectionLabel, { color: colors.sub }]}>APPEARANCE</Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <TouchableOpacity style={styles.row} onPress={() => setActiveModal("theme")}>
            <View style={styles.rowLead}>
              <Ionicons name="color-palette" size={22} color="#818CF8" />
              <Text style={[styles.rowText, { color: colors.text }]}>App Theme</Text>
            </View>
            <Text style={[styles.selectorText, { color: colors.accent }]}>{theme.toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => setActiveModal("fontSize")}>
            <View style={styles.rowLead}>
              <Ionicons name="text" size={22} color="#F472B6" />
              <Text style={[styles.rowText, { color: colors.text }]}>Font Size</Text>
            </View>
            <Text style={[styles.selectorText, { color: colors.accent }]}>{fontSize}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => setActiveModal("chatTheme")}>
            <View style={styles.rowLead}>
              <Ionicons name="image-outline" size={22} color="#10B981" />
              <Text style={[styles.rowText, { color: colors.text }]}>Chat Wallpaper</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.sub} />
          </TouchableOpacity>
        </View>

        {/* --- PRIVACY & SECURITY --- */}
        <Text style={[styles.sectionLabel, { color: colors.sub }]}>SECURITY</Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.row}>
            <View style={styles.rowLead}>
              <Ionicons name="finger-print" size={22} color="#10B981" />
              <Text style={[styles.rowText, { color: colors.text }]}>FaceID / Biometrics</Text>
            </View>
            <Switch 
              value={isBiometricOn} 
              onValueChange={(v) => { setIsBiometricOn(v); showToast(v ? "Biometrics Enabled" : "Biometrics Disabled"); }}
              trackColor={{ false: "#767577", true: "#10B981" }}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLead}>
              <Ionicons name="shield-checkmark" size={22} color="#F59E0B" />
              <Text style={[styles.rowText, { color: colors.text }]}>Two-Step Verification</Text>
            </View>
            <Switch 
              value={isTwoStepOn} 
              onValueChange={(v) => { setIsTwoStepOn(v); showToast(v ? "2FA Active" : "2FA Inactive"); }}
              trackColor={{ false: "#767577", true: "#F59E0B" }}
            />
          </View>
        </View>

        {/* --- NOTIFICATIONS & CHATS --- */}
        <Text style={[styles.sectionLabel, { color: colors.sub }]}>CHATS & NOTIFS</Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.row}>
            <View style={styles.rowLead}>
              <Ionicons name="notifications" size={22} color="#3B82F6" />
              <Text style={[styles.rowText, { color: colors.text }]}>Push Notifications</Text>
            </View>
            <Switch value={isNotifOn} onValueChange={setIsNotifOn} />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLead}>
              <Ionicons name="checkmark-done" size={22} color="#10B981" />
              <Text style={[styles.rowText, { color: colors.text }]}>Read Receipts</Text>
            </View>
            <Switch value={isReceiptsOn} onValueChange={setIsReceiptsOn} />
          </View>
        </View>

        {/* --- OTHERS --- */}
        <Text style={[styles.sectionLabel, { color: colors.sub }]}>OTHER</Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <TouchableOpacity style={styles.row} onPress={handleShare}>
            <View style={styles.rowLead}>
              <Ionicons name="share-social-outline" size={22} color="#60A5FA" />
              <Text style={[styles.rowText, { color: colors.text }]}>Invite Friends</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => setActiveModal("privacy")}>
            <View style={styles.rowLead}>
              <Ionicons name="document-lock-outline" size={22} color="#94A3B8" />
              <Text style={[styles.rowText, { color: colors.text }]}>Privacy Policy</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logout} onPress={() => showToast("Logging out...")}>
          <Text style={styles.logoutText}>Logout from Device</Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: colors.sub }]}>Version 2.4.0 (Stable)</Text>
      </ScrollView>

      {/* --- UNIVERSAL MODAL --- */}
      <Modal visible={activeModal !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { backgroundColor: theme === 'light' ? '#FFF' : '#1F2937' }]}>
            <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                    {activeModal === 'theme' ? "App Theme" : 
                     activeModal === 'fontSize' ? "Font Size" : 
                     activeModal === 'chatTheme' ? "Chat Wallpapers" : 
                     activeModal === 'privacy' ? "Privacy Policy" : "Profile Details"}
                </Text>
                <TouchableOpacity onPress={() => setActiveModal(null)}>
                    <Ionicons name="close" size={24} color={colors.sub} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {activeModal === 'theme' && ["light", "dark", "neutral"].map((m) => (
                    <TouchableOpacity key={m} style={styles.optionBtn} onPress={() => { setTheme(m as any); setActiveModal(null); }}>
                        <Text style={[styles.optionText, { color: colors.text, textTransform: 'capitalize' }]}>{m}</Text>
                        {theme === m && <Ionicons name="radio-button-on" size={20} color={colors.accent} />}
                    </TouchableOpacity>
                ))}

                {activeModal === 'fontSize' && ["Small", "Medium", "Large"].map((s) => (
                    <TouchableOpacity key={s} style={styles.optionBtn} onPress={() => { setFontSize(s as any); setActiveModal(null); showToast(`Font: ${s}`); }}>
                        <Text style={[styles.optionText, { color: colors.text }]}>{s}</Text>
                        {fontSize === s && <Ionicons name="checkmark-circle" size={20} color={colors.accent} />}
                    </TouchableOpacity>
                ))}

                {activeModal === 'chatTheme' && ["Default Abstract", "Dark Solid", "Nature Bloom", "Classic Grey"].map((w) => (
                    <TouchableOpacity key={w} style={styles.optionBtn} onPress={() => { setChatWallpaper(w); setActiveModal(null); showToast("Wallpaper Set"); }}>
                        <Text style={[styles.optionText, { color: colors.text }]}>{w}</Text>
                        {chatWallpaper === w && <Ionicons name="image" size={20} color={colors.accent} />}
                    </TouchableOpacity>
                ))}

                {activeModal === 'profile' && (
                    <View style={styles.modalBody}>
                        <Text style={[styles.detailText, { color: colors.text }]}>Email: amna.illyas@company.com</Text>
                        <Text style={[styles.detailText, { color: colors.text, marginTop: 10 }]}>UID: 8829-XQ12-990</Text>
                        <Text style={[styles.detailText, { color: colors.text, marginTop: 10 }]}>Storage Used: 1.2 GB</Text>
                    </View>
                )}

                {activeModal === 'privacy' && (
                    <View style={styles.modalBody}>
                        <Text style={{ color: colors.sub, lineHeight: 22 }}>
                            We take your security seriously. All messages are end-to-end encrypted. We do not store your biometrics on our servers; they remain on your device. By using this mode, you agree to our terms of service.
                        </Text>
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity style={[styles.doneBtn, { backgroundColor: colors.accent }]} onPress={() => setActiveModal(null)}>
              <Text style={styles.doneBtnText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* --- TOAST --- */}
      <Animated.View style={[styles.toast, { opacity: toastAnim, transform: [{ translateY: toastAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
        <Text style={styles.toastText}>{toastText}</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: 120,
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
  },
  headerTitle: { fontSize: 26, fontWeight: "900", letterSpacing: -0.5 },
  iconBtn: { padding: 5 },
  searchBar: { flex: 1, flexDirection: 'row', borderRadius: 20, paddingHorizontal: 15, height: 45, alignItems: 'center' },
  searchInput: { flex: 1, marginHorizontal: 10, fontSize: 16 },
  
  scrollBody: { paddingHorizontal: 20, paddingBottom: 60 },
  profileCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 28, marginVertical: 20 },
  avatar: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: '800' },
  
  sectionLabel: { fontSize: 12, fontWeight: '900', marginBottom: 12, marginLeft: 10, letterSpacing: 1.5, marginTop: 15 },
  card: { borderRadius: 28, paddingVertical: 10, marginBottom: 25, overflow: 'hidden', elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16 },
  rowLead: { flexDirection: 'row', alignItems: 'center' },
  rowText: { fontSize: 16, fontWeight: '600', marginLeft: 15 },
  selectorText: { fontWeight: '800', fontSize: 14 },

  logout: { marginTop: 10, alignItems: 'center', padding: 18, backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 22 },
  logoutText: { color: '#EF4444', fontWeight: '800', fontSize: 16 },
  versionText: { textAlign: 'center', marginTop: 20, fontSize: 12, fontWeight: '700' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.88, borderRadius: 35, padding: 25, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  modalTitle: { fontSize: 20, fontWeight: '800' },
  modalBody: { paddingVertical: 10 },
  detailText: { fontSize: 16, fontWeight: '600' },
  optionBtn: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 0.5, borderColor: 'rgba(156, 163, 175, 0.1)' },
  optionText: { fontSize: 17, fontWeight: '600' },
  doneBtn: { marginTop: 25, padding: 16, borderRadius: 20, alignItems: 'center' },
  doneBtnText: { color: '#FFF', fontWeight: '800', fontSize: 16 },

  toast: { position: 'absolute', bottom: 50, alignSelf: 'center', backgroundColor: '#10B981', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, elevation: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 },
  toastText: { color: '#FFF', fontWeight: '900', fontSize: 14 }
});