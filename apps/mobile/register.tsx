import * as React from "react";

import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";

import {
  AuthButton,
  AuthField,
  AuthNotice,
  AuthScreen,
  CheckboxRow,
  Divider,
} from "@/components/mobile/auth-ui";

export default function RegisterScreen() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  function handleSubmit() {
    setError("");
    setSuccess(false);

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the terms of service.");
      return;
    }

    setSuccess(true);
  }

  return (
    <AuthScreen
      title="Create Account"
      subtitle="Sign up to access your secure Aether Developer space"
      footerAction={
        <Text style={styles.footerText}>
          By registering, you agree to our <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      }
    >
      {error ? <AuthNotice message={error} /> : null}
      {success ? (
        <AuthNotice
          message="Registration successful. You can now sign in with this account."
          tone="success"
        />
      ) : null}

      <AuthField
        autoCapitalize="words"
        icon="person-outline"
        label="Full Name"
        onChangeText={setFullName}
        placeholder="John Wick"
        textContentType="name"
        value={fullName}
      />
      <AuthField
        icon="mail-outline"
        label="Corporate Email"
        onChangeText={setEmail}
        placeholder="john.wick@aethermail.me"
        textContentType="emailAddress"
        value={email}
      />
      <AuthField
        icon="lock-outline"
        label="Password"
        onChangeText={setPassword}
        placeholder="At least 8 characters"
        secureTextEntry
        textContentType="newPassword"
        value={password}
      />
      <AuthField
        icon="lock-outline"
        label="Confirm Password"
        onChangeText={setConfirmPassword}
        placeholder="Repeat password"
        secureTextEntry
        textContentType="newPassword"
        value={confirmPassword}
      />

      <CheckboxRow
        checked={acceptTerms}
        label="By creating an account, you agree to our Terms of Service and Privacy Policy."
        onPress={() => setAcceptTerms((value) => !value)}
      />

      <AuthButton label="Create Account" onPress={handleSubmit} />

      <Divider label="Secure Access" />
      <Text style={styles.switchText}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/login")}>
          Sign In
        </Text>
      </Text>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
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
