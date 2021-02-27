import { emit } from 'api/common/socket';
import { BoostConfigType } from 'types/boost';

type action = 'upload' | 'delete';

/**
 * Send configuration status over MQTT on topic 'boost/configs/action'
 * @param actionType represents whether the config is being uploaded or deleted
 * @param type the type of the configuration being sent
 * @param configContent configuration content
 */
function sendConfig(actionType: action, type: BoostConfigType, configContent: string | null) {
  const topic = 'send-config';
  const payload = {
    action: actionType,
    configType: type,
    content: configContent,
  };
  emit(topic, JSON.stringify(payload));
}

/**
 * Read content from the given file and send it on `boost/configs/action` over MQTT. 
 * If the content contains more than config (i.e. `type` is 'all'), the content is
 * split into the different configurations.
 *
 * @param type the type of the configuration
 * @param configFile file containing content of the configuration
 */
export default function uploadConfig(
  type: BoostConfigType,
  configFile: File,
) {
  const topic = 'send-config';
  const reader = new FileReader();

  // Called when FileReader has completed reading a file
  reader.onload = () => {
    console.log(reader.result);
    if (type == 'all' && reader.result != null && typeof reader.result === 'string') {
      const allConfigs = JSON.parse(reader.result);
      for (const [key, ] of Object.entries(allConfigs)) {
        sendConfig('upload', <BoostConfigType>key, null);
      };
    }
    else if (typeof reader.result === 'string') {
      sendConfig('upload', type, reader.result);
    };

  reader.readAsText(configFile);
  }
};
