import { emit } from 'api/common/socket';
import { BoostConfigType } from 'types/boost';

type action = 'upload' | 'delete';

function sendConfig(actionType: action, type: BoostConfigType, name: string, configContent: string | null | ArrayBuffer) {
  const topic = 'send-config';
  const payload = {
    action: actionType,
    configType: type,
    configName: name,
    content: configContent,
  };
  emit(topic, JSON.stringify(payload));
}

/**
 * Send the content of the given configuration file on `boost/configs/action` over MQTT
 *
 * @param type the type of the configuration being sent
 * @param configFile list of files, only the first would be considered
 */
export default function uploadConfig(
  type: BoostConfigType,
  configFile: File,
) {
  const reader = new FileReader();

  // Called when FileReader has completed reading a file
  reader.onload = () => {
    console.log(reader.result);
    if (type == 'all' && reader.result != null && typeof reader.result === 'string') {
      const allConfigs = JSON.parse(reader.result);
      for (const [key, ] of Object.entries(allConfigs)) {
        sendConfig('upload', <BoostConfigType>key, allConfigs[key]['name'], null);
      };
    }
    else {
    sendConfig('upload', type, configFile.name, reader.result);
  };
  reader.readAsText(configFile);
  }
};
