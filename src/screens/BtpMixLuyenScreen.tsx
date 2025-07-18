import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ComboBox from '../components/ComboBox';
import { getWorkOrderByProductCode } from '../api/sectionsApi';

const BtpMixLuyenScreen = () => {
  const navigation = useNavigation();
  const [tenBtp, setTenBtp] = useState('');
  const [nguoiSx, setNguoiSx] = useState('');
  const [maySx, setMaySx] = useState('');
  const [soXe, setSoXe] = useState('');
  const [trongLuong, setTrongLuong] = useState('');
  const [soMeBatDau, setSoMeBatDau] = useState('');
  const [soMePallet, setSoMePallet] = useState('');
  const [ngaySx, setNgaySx] = useState('');
  const [hanSd, setHanSd] = useState('');
  const [maBtp, setMaBtp] = useState<string | null>(null);
  const [soWo, setSoWo] = useState<string | null>(null);
  const [soWoItems, setSoWoItems] = useState<{label: string, value: string}[]>([]);

  // Gọi API khi nhập xong mã BTP
  const handleMaBtpBlur = async () => {
    if (maBtp && maBtp.trim() !== '') {
      try {
        const data = await getWorkOrderByProductCode(maBtp.trim());
        // Chỉ lấy trường orderNo cho label và value
        if (Array.isArray(data)) {
          setSoWoItems(data.map((wo: any) => ({ label: wo.orderNo, value: wo.orderNo })));
        } else {
          setSoWoItems([]);
        }
      } catch (err) {
        setSoWoItems([]);
      }
    } else {
      setSoWoItems([]);
    }
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#36347D', '#625EE3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>THÔNG TIN BTP MIX - LUYỆN (RA)</Text>
      </LinearGradient>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.labelRequired}><Text style={styles.stat}>*</Text> Mã BTP:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập mã BTP"
                value={maBtp || ''}
                onChangeText={setMaBtp}
                onBlur={handleMaBtpBlur}
                returnKeyType="done"
                onSubmitEditing={handleMaBtpBlur}
              />
            </View>
            <View style={styles.col}>
              <Text style={styles.labelRequired}><Text style={styles.stat}>*</Text> Số WO:</Text>
              <ComboBox
                items={soWoItems}
                value={soWo}
                onChange={setSoWo}
                placeholder="Chọn số WO"
                width={165}
                height={50}
                searchable={false}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.colFull}>
              <Text style={styles.label}>Tên BTP:</Text>
              <TextInput style={styles.input} placeholder="Nhập thông tin" value={tenBtp} onChangeText={setTenBtp} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.labelRequired}><Text style={styles.stat}>*</Text> Người sản xuất:</Text>
              <TextInput style={styles.input} placeholder="Quét QRCode" value={nguoiSx} onChangeText={setNguoiSx} />
            </View>
            <View style={styles.col}>
              <Text style={styles.labelRequired}><Text style={styles.stat}>*</Text> Máy sản xuất:</Text>
              <TextInput style={styles.input} placeholder="Quét QRCode" value={maySx} onChangeText={setMaySx} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.labelRequired}><Text style={styles.stat}>*</Text> Ca sản xuất:</Text>
              {/* <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                /> */}
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}><Text style={styles.stat}>*</Text>Số xe:</Text>
              <TextInput style={styles.input} placeholder="Nhập thông tin" value={soXe} onChangeText={setSoXe} />
            </View>
            <View style={styles.col}>
              <Text style={styles.label}><Text style={styles.stat}>*</Text>Trọng lượng(g):</Text>
              <TextInput style={styles.input} placeholder="Nhập thông tin" value={trongLuong} onChangeText={setTrongLuong} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}><Text style={styles.stat}>*</Text>Số mẻ bắt đầu:</Text>
              <TextInput style={styles.input} placeholder="Nhập thông tin" value={soMeBatDau} onChangeText={setSoMeBatDau} />
            </View>
            <View style={styles.col}>
              <Text style={styles.label}><Text style={styles.stat}>*</Text> Số mẻ/ pallet:</Text>
              <TextInput style={styles.input} placeholder="Nhập thông tin" value={soMePallet} onChangeText={setSoMePallet} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Ngày sản xuất:</Text>
              <TextInput style={styles.input} placeholder="dd/mm/yyyy" value={ngaySx} onChangeText={setNgaySx} />
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Hạn sử dụng:</Text>
              <TextInput style={styles.input} placeholder="dd/mm/yyyy" value={hanSd} onChangeText={setHanSd} />
            </View>
          </View>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>Làm Mới</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateBtn}>
              <LinearGradient
                colors={['#36347D', '#625EE3']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.updateBtnGradient}
              >
                <Text style={styles.updateBtnText}>Cập Nhật & In Tem</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    screen:{
    flex:1
    },
  headerGradient: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'center',
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8
  },
  headerBack: {
    position: 'absolute',
    left: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 8,
    zIndex: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginLeft:20
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 380,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#625EE3',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },
  col: {
    flex: 1,
    marginHorizontal: 4,
  },
  colFull: {
    flex: 1,
    marginHorizontal: 4,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    color: '#36347D',
    marginBottom: 4,
    fontSize: 13,
  },
  stat:{
    color:'red'
  },
  labelRequired: {
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    marginBottom: 2,
  },
  inputDrop:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    marginBottom: 2,
    zIndex:1000
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  resetBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#625EE3',
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    elevation: 3,
  },
  resetBtnText: {
    color: '#36347D',
    fontWeight: '500',
    fontSize: 15,
  },
  updateBtn: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 8,
    height: 44,
    elevation: 3,
  },
  updateBtnGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  updateBtnText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default BtpMixLuyenScreen; 