import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import '@/css/DateTimePicker.css';
import { View } from 'react-native';

type DateTimePickerProps = {
  onDateChange: (selectedDate: Date) => void;
  value: Date;
};

const CustomDateTimePicker: React.FC<DateTimePickerProps> = (props: DateTimePickerProps) => {
  const [date, setDate] = useState<Date>(props.value);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    props.onDateChange(newDate);
  };

  return (
    <View style={{ textAlign: 'center' }}>
      <DateTimePicker
        onChange={handleDateChange}
        value={date}
        disableClock={true}
        disableCalendar={true}
        clearIcon={null}
        format='dd/MM/yyyy HH:mm'
        locale='pt-BR'
      />
    </View>
  );
};

export default CustomDateTimePicker;
