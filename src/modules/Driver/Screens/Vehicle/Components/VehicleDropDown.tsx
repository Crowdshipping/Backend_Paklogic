import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
const VehicleDropDown = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [items, setItems] = React.useState([
        { label: 'Car', value: 'car' },
        { label: 'Bike', value: 'bike' },
        { label: 'Cycle', value: 'cycle' },
    ]);

    return (
        <DropDownPicker
            zIndex={1000}
            style={{
                backgroundColor: '#f0f0f0',
                borderWidth: 0,
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(val) => {
                setValue(val);
            }}
            setItems={setItems}
            containerStyle={{
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 5,
            }}
        />
    );
};
export default VehicleDropDown;
