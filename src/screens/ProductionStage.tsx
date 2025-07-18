import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faComment } from '@fortawesome/free-regular-svg-icons';
import { getSections } from '../api/sectionsApi';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import { Section } from '../types/section';
import { RootStackParamList } from '../types/RootStackParamList';
const images = {
  logo: require('../assets/images/logo.png'),
};

const ProductionStageScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const handleConfirm = () => {
    if (value) {
      // Tìm object section đã chọn từ items
      const selectedSection = items.find(item => item.value === value)!;
      navigation.navigate('Menu', { section: selectedSection });
    } else {
      // Có thể hiện thông báo yêu cầu chọn công đoạn
    }
  };
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const sections: Section[] = await getSections();
        const mappedItems = sections.map(section => ({
          label: section.sectionName,
          value: section.sectionNo,
        }));
        setItems(mappedItems);
      } catch (error) {
        // Có thể thêm xử lý lỗi ở đây
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  return (
    <TouchableWithoutFeedback  accessible={false}>
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.title}>CHỌN CÔNG ĐOẠN SẢN XUẤT</Text>
       <View style={{width:"100%",height:"50%"}}>
        <Text style={styles.label}>Công đoạn:</Text>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        theme="LIGHT"
        mode="BADGE"
        placeholder='Chọn công đoạn'
        loading={loading}
      />
        </View>
        <LinearGradient
          colors={['#36347D', '#625EE3']}
          style={styles.confirmBtn}
        >
          <TouchableOpacity onPress={handleConfirm} activeOpacity={0.8} style={styles.btnButton}>
            <Text style={styles.confirmBtnText}>XÁC NHẬN</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#625EE3',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  label: {
    fontWeight: 'bold',
    color: '#36347D',
    marginBottom: 4,
    marginLeft: 2,
    fontSize: 15,
  },
  confirmBtn: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50
  },
  btnButton:{
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%'
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