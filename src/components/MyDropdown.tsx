import React from 'react';
// import {View, TouchableOpacity, Text} from 'react-native';
// import {SvgXml} from 'react-native-svg';
// import {dateSvg} from '../theme/assets/svg/dateSvg';

// import {Picker} from '@react-native-picker/picker';
// const MyDropdown = ({text, onPress}: any) => {
//   const [selectedLanguage, setSelectedLanguage] = React.useState();
//   return (
//     <View accessibilityRole="alert" style={{flex: 1}}>
//       <Picker
//         mode="dropdown"
//         selectedValue={selectedLanguage}
//         onValueChange={(itemValue, itemIndex) =>
//           setSelectedLanguage(itemValue)
//         }>
//         <Picker.Item label="Java" value="java" />
//         <Picker.Item label="JavaScript" value="js" />
//       </Picker>
//     </View>
//   );
// };

// export default MyDropdown;
import DropDownPicker from 'react-native-dropdown-picker';

const MyDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  return (
    <DropDownPicker
      style={{
        backgroundColor: '#f0f0f0',
        borderWidth: 0,
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};
export default MyDropdown;
