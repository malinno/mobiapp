import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { faBackward  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
const images = {
  logo: require('../assets/images/logo.png'),
};

const menuData = (sectionName: string) => {
  const name = sectionName.toLowerCase();
  if (name.includes('luyện')) {
    return {
      title: 'CÔNG ĐOẠN LUYỆN',
      items: [
        'Cập nhật BTP đầu ra',
        'Kiểm tra BTP đầu ra',
        'Nhập trả BTP',
        'Truy vấn thông tin',
      ],
    };
  }
  if (name.includes('tanh') || name.includes('ép') || name.includes('cán trắng')) {
    return {
      title: `CÔNG ĐOẠN ${sectionName.toUpperCase()}`,
      items: [
        'Cập nhật Nguyên liệu đầu vào',
        'Cập nhật BTP đầu ra',
        'Nhập trả BTP',
        'Hồi Luyện',
        'Truy vấn thông tin',
      ],
    };
  }
  // Menu Chung
  return {
    title: `CÔNG ĐOẠN ${sectionName.toUpperCase()}`,
    items: [
      'Cập nhật Nguyên liệu đầu vào',
      'Cập nhật BTP đầu ra',
      'Nhập trả BTP',
      'Truy vấn thông tin',
    ],
  };
};

const MenuScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const section = route.params && (route.params as any).section;
  if (!section) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Không có dữ liệu công đoạn!</Text></View>;
  }
  const { title, items } = menuData(section.label);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faBackward}  size={25} style={{ color: "#36347D", }} />
      </TouchableOpacity>
      <Image source={images.logo} style={styles.logo} />
      <Text  numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{title}</Text>
      {items.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.menuBtn}
          onPress={() => {
            if (title === 'CÔNG ĐOẠN LUYỆN' && idx === 0) {
              (navigation as any).navigate('BtpMixLuyen');
            }
          }}
        >
          <Text style={styles.menuBtnText}>{`${idx + 1}. ${item}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
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
  logo: {
    width: 180,
    height: 64,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize:17,
    fontWeight: 'bold',
    color: '#625EE3',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 1,
    lineHeight:35,
    textTransform: 'none',
    flexWrap: 'wrap',
  },
  menuBtn: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#625EE3',
  },
  menuBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'none',
  },
  backBtn: {
    position: 'absolute',
    top: 1,
    left: 10,
    zIndex: 10,
    padding: 8,
  },
});

export default MenuScreen; 