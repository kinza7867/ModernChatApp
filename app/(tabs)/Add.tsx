import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddContactScreen() {
  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    if (!name || !phone) {
      Alert.alert("Missing Details", "Please provide a Name and Phone number to add this contact.");
      return;
    }

    // FIXED LOGIC: Passing the actual 'name' state to the next screen
    Alert.alert(
      "Contact Added",
      `${name} is now in your chat list. Start a conversation?`,
      [
        { text: "Later", onPress: () => router.back(), style: "cancel" },
        { 
          text: "Message Now", 
          onPress: () => {
            // Passing the name as a search parameter so the chat screen knows who this is
            router.push({
              pathname: "/chat_inbox",
              params: { newChatName: name}
            }); 
          } 
        }
      ]
    );
  };

  return (
    <LinearGradient colors={["#100f61ff", "#203A43", "#2C5364"]} style={styles.container}>
      <StatusBar style="light" />

      {/* --- PREMIUM HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Conversation</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollBody} bounces={false}>
          
          {/* --- INFO BOX --- */}
          <View style={styles.infoBox}>
            <MaterialCommunityIcons name="account-plus-outline" size={40} color="#60A5FA" />
            <Text style={styles.infoTitle}>Add to Chat List</Text>
            <Text style={styles.infoSub}>Enter the details below to find your contact and start messaging.</Text>
          </View>

          {/* --- FORM CARD --- */}
          <View style={styles.formCard}>
            
            {/* NAME INPUT */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>FULL NAME</Text>
              <View style={styles.inputRow}>
                <Ionicons name="person-outline" size={20} color="#60A5FA" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter contact name"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* PHONE INPUT */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <View style={styles.inputRow}>
                <Ionicons name="call-outline" size={20} color="#60A5FA" />
                <TextInput
                  style={styles.textInput}
                  placeholder="+92 300 1234567"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            {/* EMAIL (OPTIONAL) */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>EMAIL ADDRESS (OPTIONAL)</Text>
              <View style={styles.inputRow}>
                <Ionicons name="mail-outline" size={20} color="#60A5FA" />
                <TextInput
                  style={styles.textInput}
                  placeholder="example@mail.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

          </View>

          {/* --- ACTION BUTTON --- */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSave} activeOpacity={0.8}>
              <LinearGradient
                colors={["#3B82F6", "#1D4ED8"]}
                style={styles.gradientBtn}
              >
                <Text style={styles.btnText}>Add to Chat List</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
            
            <Text style={styles.securityNote}>
              <Ionicons name="shield-checkmark" size={12} color="#10B981" /> End-to-end encrypted
            </Text>
          </View>

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
    paddingTop: Platform.OS === 'ios' ? 60 : 45,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "800", letterSpacing: 0.5 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },

  scrollBody: { paddingHorizontal: 24, paddingBottom: 40 },

  infoBox: { alignItems: 'center', marginVertical: 30 },
  infoTitle: { color: '#FFF', fontSize: 22, fontWeight: '800', marginTop: 15 },
  infoSub: { color: '#94A3B8', textAlign: 'center', fontSize: 14, marginTop: 8, lineHeight: 20, paddingHorizontal: 20 },

  formCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputWrapper: { marginBottom: 25 },
  label: { color: '#60A5FA', fontSize: 11, fontWeight: '900', marginBottom: 10, letterSpacing: 1.2 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  textInput: { flex: 1, color: '#FFF', marginLeft: 12, fontSize: 16 },

  footer: { marginTop: 40, alignItems: 'center' },
  primaryBtn: { width: '100%', height: 60, borderRadius: 20, overflow: 'hidden', elevation: 10, shadowColor: '#3B82F6', shadowOpacity: 0.4, shadowRadius: 15 },
  gradientBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#FFF', fontSize: 17, fontWeight: '800', marginRight: 10 },
  
  securityNote: { color: '#10B981', fontSize: 12, marginTop: 20, fontWeight: '600' }
});