import { AuthContext } from '@/utils/authContext';
import { useContext, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function SignupScreen() {
  const { signUp } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Create Account</Text>

      <Text style={{ marginBottom: 5 }}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
      />

      <Text style={{ marginBottom: 5 }}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
      />

      <Button title="Sign Up" onPress={() => signUp(username.trim(), password)} />
    </View>
  );
}
