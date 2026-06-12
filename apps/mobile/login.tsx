import * as React from "react";

import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  AuthButton,
  AuthField,
  AuthNotice,
  AuthScreen,
  CheckboxRow,
  Divider,
} from "@/components/mobile/auth-ui";

export default function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState("");

  function handleSubmit() {
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    router.replace("/");
  }

  return (
    <AuthScreen
      title="Sign In"
      subtitle="Please authenticate to access your secure Aether Developer space"
      footerAction={
        <Text style={styles.footerText}>
          By signing in, you agree to our <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      }
    >
      {error ? <AuthNotice message={error} /> : null}

      <AuthField
        icon="mail-outline"
        label="Email / Username"
        onChangeText={setEmail}
        placeholder="john.wick@aethermail.me"
        textContentType="emailAddress"
        value={email}
      />
      <AuthField
        icon="lock-outline"
        label="Password"
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        value={password}
      />

      <View style={styles.optionRow}>
        <CheckboxRow checked={rememberMe} label="Remember me" onPress={() => setRememberMe((value) => !value)} />
        <Pressable>
          <Text style={styles.forgot}>Forgot password?</Text>
        </Pressable>
      </View>

      <AuthButton label="Sign In" onPress={handleSubmit} />

      <Divider label="Secure Access" />
      <Text style={styles.switchText}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/register")}>
          Create Account
        </Text>
      </Text>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  forgot: {
    color: "#0A5DB8",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
  switchText: {
    color: "#6B7280",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  footerText: {
    color: "#6B7280",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
  },
  link: {
    color: "#0A5DB8",
    fontWeight: "800",
  },
});
