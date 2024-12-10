import { Network } from '@capacitor/network';
import * as AppType from '../../utility/AppInterfaces';

export const networkListener = async (
  setNetworkData: AppType.NetworkDataConfig,
) => {
  const listenerNetwork = await Network.addListener(
    'networkStatusChange',
    (status) => {
      setNetworkData = status;
      console.log(setNetworkData, 'status');
    },
  );
  return listenerNetwork;
};

export const logCurrentNetworkStatus = async () => {
  return await Network.getStatus();
};
