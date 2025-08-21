// src/screens/ChatWithDBScreen.tsx
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import theme from '../theme/Theme';

export default function ChatWithDBScreen({ navigation }: any) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; text: string }>>([
    { id: 'm0', role: 'assistant', text: 'Hello' },
    {
      id: 'm1',
      role: 'assistant',
      text:
        'Delete src/controllers/department\nDelete src/controllers/department\nDelete src/controllers/department\nDelete src/controllers/department\nDelete src/controllers/department\nDelete src/controllers/department',
    },
  ]);
  const [generating, setGenerating] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const canSend = input.trim().length > 0 && !generating;

  const onSend = async () => {
    if (!canSend) return;
    const userMsg = { id: String(Date.now()), role: 'user' as const, text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setGenerating(true);

    // Fake generation delay
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: String(Date.now() + 1), role: 'assistant', text: 'Generating response based on DB…' },
      ]);
      setGenerating(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    }, 900);
  };

  // No-op

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topbar}>
        <Pressable
          style={styles.menuBtn}
          onPress={() => navigation.getParent('DrawerRoot')?.dispatch(DrawerActions.openDrawer())}
        >
          <Text style={styles.menuIcon}>≡</Text>
        </Pressable>
        <View style={styles.brandPill}>
          <Text style={styles.brandText}>BestLaw</Text>
        </View>
       
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m, idx) => (
          <View key={m.id} style={[styles.bubble, m.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={m.role === 'user' ? styles.userText : styles.aiText}>{m.text}</Text>
            {m.role === 'assistant' && idx === messages.length - 1 && (
              <View style={{ alignSelf: 'flex-end', marginTop: 8 }}>
                <Pressable style={styles.correctBtn} onPress={() => {}}>
                  <Text style={{ color: colors.text }}>Correct</Text>
                </Pressable>
              </View>
            )}
          </View>
        ))}
        {generating && (
          <View style={[styles.bubble, styles.aiBubble]}>
            <Text style={styles.aiText}>Generating…</Text>
          </View>
        )}
      </ScrollView>

      {/* Composer */}
      <View style={styles.composerWrap}>
        <Pressable style={styles.generateBtn} onPress={onSend} disabled={!canSend}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Generate</Text>
        </Pressable>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor={colors.inputPlaceholder}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={onSend}
            returnKeyType="send"
          />
          <Pressable style={styles.micBtn} onPress={() => {}}>
            <Text style={{ fontSize: 18 }}>🎤</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (colors: typeof theme.colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    topbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingTop: 6,
      paddingBottom: 6,
      zIndex: 200,
      elevation: 8,
    },
    menuBtn: {
      width: 40,
      height: 40,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...theme.shadow.card,
    },
    menuIcon: { fontSize: 18, color: colors.text },
    brandPill: {
      backgroundColor: colors.card,
      borderRadius: theme.radius.full,
      paddingHorizontal: 14,
      paddingVertical: 6,
      ...theme.shadow.card,
    },
    brandText: { color: colors.text, fontSize: 16, fontWeight: '700' },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      ...theme.shadow.card,
    },
    title: { color: colors.text, fontWeight: '700', fontSize: 16 },
    scroll: { flex: 1 },
    bubble: {
      padding: 12,
      borderRadius: 14,
      marginBottom: 12,
      maxWidth: '88%',
      ...theme.shadow.card,
    },
    userBubble: {
      alignSelf: 'flex-end',
      backgroundColor: colors.primary,
    },
    aiBubble: {
      alignSelf: 'flex-start',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    userText: { color: '#fff' },
    aiText: { color: colors.text },
    composerWrap: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      gap: 10,
    },
    generateBtn: {
      alignSelf: 'flex-start',
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      ...theme.shadow.card,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: theme.radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      ...theme.shadow.card,
    },
    input: {
      flex: 1,
      paddingVertical: 12,
      color: colors.text,
    },
    micBtn: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryLight,
      borderRadius: 16,
      marginLeft: 8,
    },
    correctBtn: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
  });
