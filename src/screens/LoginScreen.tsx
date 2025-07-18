import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Animated, ActivityIndicator } from 'react-native';
import AlertMessage from '../components/AlertMessage';
import { useAuthStore } from '../store/authStore';
import LinearGradient from 'react-native-linear-gradient';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock,faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { loginApi } from '../api/authApi';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '', type: 'error' as 'error' | 'success' | 'info' });
  const setAuth = useAuthStore((s) => s.setAuth);
  const alertOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (alert.visible) {
      Animated.timing(alertOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(alertOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [alert.visible, alertOpacity]);
  //logo
  const images = {
    logo: require('../assets/images/logo.png'),
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginApi({ accountName: username, password });
      if (res && res.token) {
        await setAuth(res.token, res.refreshToken || '', res.user || { accountName: username });
        setAlert({ visible: true, message: 'Đăng nhập thành công!', type: 'success' });
        setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'Productions' as never }] });
        }, 500);
      } else {
        setAlert({ visible: true, message: 'Sai tài khoản hoặc mật khẩu!', type: 'error' });
      }
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        setAlert({ visible: true, message: 'Sai tài khoản hoặc mật khẩu!', type: 'error' });
      } else {
        setAlert({ visible: true, message: 'Có lỗi xảy ra!', type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image source={images.logo} style={styles.images} />
          <Text style={styles.title}>ĐĂNG NHẬP</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tài Khoản:</Text>
            <View style={styles.inputWrap}>
              
              <FontAwesomeIcon icon={faUser} size={20} color="#888" style={styles.inputIcon}/>
              <TextInput
                style={styles.input}
                placeholder="Tên tài khoản"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="#aaa"
              />
            </View>
            <Text style={styles.label}>Mật khẩu:</Text>
            <View style={styles.inputWrap}>
              
              <FontAwesomeIcon icon={faLock} size={20} color="#888" style={styles.inputIcon}/>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={styles.eyeIcon}>
                <FontAwesomeIcon  icon={showPassword ? faEyeSlash : faEye} size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.8} disabled={loading}>
            <LinearGradient
              colors={['#36347D', '#625EE3']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradientBtn}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginBtnText}>ĐĂNG NHẬP</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <Animated.View style={[styles.alertContainer, { opacity: alertOpacity }]}> 
            <AlertMessage
              visible={alert.visible}
              message={alert.message}
              type={alert.type}
              onHide={() => setAlert((a) => ({ ...a, visible: false }))}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  images:{
      width:227,
      height:80,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#625EE3',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop:30
  },
  inputGroup: {
    width: '100%',
    marginBottom: 80,
    marginTop:10
  },
  label: {
    fontWeight: 'bold',
    color: '#36347D',
    marginBottom: 4,
    marginLeft: 2,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#222',
  },
  eyeIcon: {
    padding: 4,
  },
  loginBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  gradientBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  alertContainer: {
    position: 'absolute',
    top: -40,
    right: -10,
    zIndex: 100,
    minWidth: 300,
    maxWidth: 500,
    alignItems: 'flex-end',
  },
});

export default LoginScreen;