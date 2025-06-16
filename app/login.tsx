import { ThemedText } from '@/components/ThemedText';
import { AuthContext } from '@/utils/authContext';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const { logIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 20, padding: 10, borderRadius: 5 }}
      />

      <Text style={{ marginBottom: 10 }}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 10, borderRadius: 5 }}
      />

      <Button title="Log In" onPress={() => logIn(username.trim(), password)} />


    <ThemedText darkColor='true'></ThemedText>
      <Button title="Sign Up" onPress={() => router.push('/signup')}/>
    </View>
  );
}
