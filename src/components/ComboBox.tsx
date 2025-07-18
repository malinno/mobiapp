import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Keyboard, DimensionValue } from 'react-native';
import { ComboBoxProps } from '../types/conbobox';
const ComboBox: React.FC<ComboBoxProps> = ({
  items,
  value,
  onChange,
  placeholder = 'Chọn...',
  width = 200,
  height = 40,
  searchable = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<TextInput>(null);
  const containerRef = useRef<View>(null);

  const filteredItems = searchable
    ? items.filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
    : items;

  // Đóng dropdown khi bấm ra ngoài
  useEffect(() => {
    if (!visible) return;
    const handleTouch = (e: any) => {
      if (containerRef.current) {
        containerRef.current.measure((fx, fy, w, h, px, py) => {
          const { pageX, pageY } = e.nativeEvent;
          if (
            pageX < px ||
            pageX > px + w ||
            pageY < py ||
            pageY > py + h + 5
          ) {
            setVisible(false);
          }
        });
      }
    };
    const sub = Keyboard.addListener('keyboardDidHide', () => setVisible(false));
    const sub2 = Keyboard.addListener('keyboardDidShow', () => setVisible(false));
    const listener = (e: any) => handleTouch(e);
    // @ts-ignore
    globalThis.addEventListener?.('touchstart', listener, true);
    return () => {
      sub.remove();
      sub2.remove();
      // @ts-ignore
      globalThis.removeEventListener?.('touchstart', listener, true);
    };
  }, [visible]);

  useEffect(() => {
    if (visible && searchable) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [visible, searchable]);

  return (
    <View ref={containerRef} style={{ width: width as DimensionValue }}>
      <TouchableOpacity
        style={[styles.box, { width: width as DimensionValue, height: height as DimensionValue }]}
        onPress={() => setVisible(v => !v)}
        activeOpacity={0.7}
      >
        <Text style={{ color: value ? '#000' : '#888', flex: 1 }} numberOfLines={1}>
          {items.find(i => i.value === value)?.label || placeholder}
        </Text>
        <FontAwesomeIcon icon={visible ? faChevronUp : faChevronDown} size={16} color="#888" />
      </TouchableOpacity>
      {visible && (
        <View style={[styles.dropdown, { width: width as DimensionValue, maxHeight: 250 }]}> 
          {searchable && (
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder="Tìm kiếm..."
              value={search}
              onChangeText={setSearch}
            />
          )}
          <ScrollView style={{maxHeight: 200}} keyboardShouldPersistTaps="handled">
            {filteredItems.length === 0 ? (
              <Text style={styles.empty}>Không có dữ liệu</Text>
            ) : (
              filteredItems.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.item}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                    setSearch('');
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    marginLeft: 8,
    fontSize: 16,
    color: '#888',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    minWidth: 120,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    padding: 12,
  },
});

export default ComboBox; 