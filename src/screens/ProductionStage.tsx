import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { getSections } from '../api/sectionsApi';

const images = {
  logo: require('../assets/images/logo.png'),
};

const ProductionStageScreen = () => {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(null);
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSections();
        console.log('API sections response:', data);
        setItems(data.map(section => ({ label: section.sectionName, value: section.sectionNo })));
      } catch (e: any) {
        console.log('Lỗi lấy sections:', e, e?.response?.data);
      }
    };
    fetchSections();
  }, []);

  const handleConfirm = () => {
    // Xử lý xác nhận công đoạn
  };

  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logo} />
      <Text style={styles.title}>CHỌN CÔNG ĐOẠN SẢN XUẤT</Text>
      <View style={[styles.inputGroup, { zIndex: 1000 }]}>
        <Text style={styles.label}>Công đoạn:</Text>
        <View style={[styles.inputWrap, { zIndex: 1000 }]}>
          <FontAwesomeIcon icon={faComment} size={20} color="#000" style={styles.inputIcon} />
          <View style={styles.separator} />
          <View style={{ flex: 1, zIndex: 9999 }}>
            <DropDownPicker
              open={open}
              value={stage}
              items={items}
              setOpen={setOpen}
              setValue={setStage}
              setItems={setItems}
              placeholder="Chọn công đoạn"
              style={styles.dropdown}
              dropDownContainerStyle={[styles.dropdownContainer, { maxHeight: 240, zIndex: 9999,width:259,borderRadius:10 }]}
              mode="BADGE"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.8}>
        <LinearGradient
          colors={['#36347D', '#625EE3']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradientBtn}
        >
          <Text style={styles.confirmBtnText}>XÁC NHẬN</Text>
        </LinearGradient>
      </TouchableOpacity>
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
  separator: {
    width: 1,
    height: '60%',
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  logo: {
    width: 180,
    height: 64,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#625EE3',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 32,
    zIndex: 1000,
  },
  label: {
    fontWeight: 'bold',
    color: '#36347D',
    marginBottom: 4,
    marginLeft: 2,
    fontSize: 15,
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
    zIndex: 1000,
  },
  inputIcon: {
    marginRight: 6,
  },
  dropdown: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginTop: 2
  },
  confirmBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  gradientBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  logoutBtn: {
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#36347D',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductionStageScreen; 