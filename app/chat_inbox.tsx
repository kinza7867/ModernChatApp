import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ChatInboxScreen() {
  // 1. DYNAMIC DATA FETCHING
  const params = useLocalSearchParams();
  
  // Logic: Prioritize the data passed from the contact list
  const activeName = params.name || params.userName || "Unknown Contact";
  const activePhone = params.phone || params.userPhone || "+92 300 0000000";
  const userAvatar = params.avatar || "https://i.pravatar.cc/150?img=32";

  // 2. STATE MANAGEMENT 
  // Custom messages based on the specific contact
  const [messages, setMessages] = useState([
    { 
      id: "system_1", 
      text: `Messages to this chat are now secured with end-to-end encryption.`, 
      sender: "system" 
    },
    { 
      id: "header_msg", 
      text: `Starting conversation with ${activeName}`, 
      sender: "system" 
    },
  ]);
  
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // 3. AUTO-SCROLL TO BOTTOM
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  }, [messages]);

  // 4. SEND MESSAGE LOGIC
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <LinearGradient colors={["#0F2027", "#203A43", "#2C5364"]} style={styles.container}>
      <StatusBar style="light" />

      {/* ---------- CUSTOM HEADER ---------- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.userInfo} 
            onPress={() => {
                // NAVIGATION FIX: Ensure your file is app/modal.tsx
                router.push({
                    pathname: "/modal",
                    params: { 
                      name: activeName, 
                      phone: activePhone,
                      avatar: userAvatar,
                      bio: `Professional: Mobile Developer\nStatus: Available for projects.`
                    }
                });
            }}
          >
            <Image 
                source={{ uri: (userAvatar as string) }} 
                style={styles.avatar} 
            />
            <View>
              <Text style={styles.title} numberOfLines={1}>{activeName}</Text>
              <Text style={styles.status}>Online</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.push("/calls")}>
            <Ionicons name="call-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.push("/calls")}>
            <Ionicons name="videocam-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ---------- CHAT AREA ---------- */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isMe = item.sender === "me";
          const isSystem = item.sender === "system";

          if (isSystem) {
            return (
              <View style={styles.systemMsgContainer}>
                <Text style={styles.systemMsgText}>{item.text}</Text>
              </View>
            );
          }

          return (
            <View style={[styles.messageRow, isMe ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
              {!isMe && (
                <Image 
                    source={{ uri: (userAvatar as string) }} 
                    style={styles.miniAvatar} 
                />
              )}
              <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
                <Text style={styles.messageText}>{item.text}</Text>
                {item.time && (
                  <Text style={[styles.timeText, isMe ? { color: '#E0E0E0' } : { color: '#9CA3AF' }]}>
                    {item.time}
                  </Text>
                )}
              </View>
            </View>
          );
        }}
      />

      {/* ---------- INPUT BAR ---------- */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={styles.inputFooter}>
          <TouchableOpacity style={styles.attachBtn}>
            <Feather name="plus" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              style={styles.inputField}
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity style={styles.emojiBtn}>
              <MaterialCommunityIcons name="emoticon-outline" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.sendBtn, !input.trim() && { backgroundColor: 'rgba(255,255,255,0.1)' }]} 
            onPress={sendMessage}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 45,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  backBtn: { padding: 5, marginRight: 5 },
  userInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: 42, height: 42, borderRadius: 21, marginRight: 12, borderWidth: 1.5, borderColor: '#10B981' },
  title: { fontSize: 17, fontWeight: "700", color: "#FFFFFF", maxWidth: width * 0.4 },
  status: { fontSize: 12, color: "#10B981", fontWeight: '600' },
  headerRight: { flexDirection: 'row' },
  headerIcon: { marginLeft: 12, width: 38, height: 38, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 10 },
  messageList: { paddingHorizontal: 15, paddingVertical: 20 },
  messageRow: { flexDirection: 'row', marginBottom: 15, alignItems: 'flex-end' },
  miniAvatar: { width: 26, height: 26, borderRadius: 13, marginRight: 8, marginBottom: 5 },
  bubble: { maxWidth: width * 0.75, padding: 12, borderRadius: 20 },
  myBubble: { backgroundColor: "#3B82F6", borderBottomRightRadius: 4 },
  otherBubble: { backgroundColor: "rgba(255,255,255,0.12)", borderBottomLeftRadius: 4 },
  messageText: { color: "#FFFFFF", fontSize: 15, lineHeight: 22 },
  timeText: { fontSize: 10, marginTop: 4, textAlign: 'right', opacity: 0.7 },
  systemMsgContainer: { 
    alignSelf: 'center', 
    backgroundColor: 'rgba(255,255,255,0.08)', 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 20, 
    marginVertical: 10,
    maxWidth: '85%',
  },
  systemMsgText: { color: '#94A3B8', fontSize: 12, textAlign: 'center' },
  inputFooter: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#16212E",
    paddingBottom: Platform.OS === 'ios' ? 35 : 15, 
  },
  attachBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.08)', justifyContent: 'center', alignItems: 'center', marginBottom: 2 },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    maxHeight: 120,
  },
  inputField: { flex: 1, color: "#FFFFFF", fontSize: 15, paddingVertical: 10 },
  emojiBtn: { padding: 5 },
  sendBtn: { width: 46, height: 46, backgroundColor: "#10B981", borderRadius: 23, justifyContent: "center", alignItems: "center", marginBottom: 2 },
});