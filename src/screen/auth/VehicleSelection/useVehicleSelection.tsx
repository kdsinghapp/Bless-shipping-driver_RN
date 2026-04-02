import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GetVehiclesApi, AssignVehicleToDriverApi } from '../../../Api/apiRequest';
import ScreenNameEnum from '../../../routes/screenName.enum';

export const useVehicleSelection = () => {
  const navigation = useNavigation<any>();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const getVehicles = async () => {
    const data = await GetVehiclesApi(setLoading);
    if (data) {
      setVehicles(data);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedVehicle(id);
  };

  const handleContinue = async () => {
    if (selectedVehicle) {
      const res = await AssignVehicleToDriverApi(selectedVehicle, setLoading);
      if (res) {
        navigation.reset({
          index: 0,
          routes: [{ name: ScreenNameEnum.DeliveryDrawer }],
        });
      }
    }
  };

  const handleContinue1 = async () => {

    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNameEnum.DeliveryDrawer }],
    });


  };

  return {
    vehicles,
    loading,
    selectedVehicle,
    handleSelect,
    handleContinue,
    handleContinue1
  };
};
