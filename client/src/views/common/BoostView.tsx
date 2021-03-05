import React from 'react';
import ContentPage from 'components/common/ContentPage';
import BoostCalibration from 'components/common/boost/BoostCalibration';
import BoostConfigurator from 'components/common/boost/BoostConfigurator';
import { setCalibration, resetCalibration } from 'api/common/powerModel';
import uploadConfig, {sendConfig} from 'api/v3/boost';
import { BoostConfigType, BoostConfig } from 'types/boost';
import toast from 'react-hot-toast';

// TODO: Implement actual functions for `onSelectConfig`, `onDeleteConfig` and true values for `baseConfigs` (provided from `boost`)

/**
 * Inform boost of the deletion of the given config file
 * 
 * @param configType the type of the config
 * @param name name of the config file
 */
function onDeleteConfig(configType: BoostConfigType, name: string) {
  console.log("Deleted config:");
  console.log(`type: ${configType}`);
  console.log(`name: ${name}`);
  sendConfig('delete',configType, null);
  toast.success(`${name} deleted`);
}

// Only dummy data
const baseConfigs: BoostConfig[] = [
  {
    type: 'powerPlan',
    options: ['my_plan_1.json', 'this_one_gets_you_to_144.json'],
    active: 'my_plan_1.json',
  },
  {
    type: 'rider',
    options: ['al.json', 'charles.json'],
    active: 'charles.json',
  },
  {
    type: 'bike',
    options: ['blacksmith.json', 'wombat.json', 'precilla.json'],
    active: 'wombat.json',
  },
  {
    type: 'track',
    options: ['ford.json', 'holden.json', 'battle_mountain.json'],
    active: 'ford.json',
  },
];

/**
 * Boost View component
 *
 * @returns {React.Component} Component
 */
export default function BoostView() {
  // TODO: remove the hardcoded value for `distTravelled` with actual value read from MQTT

  const handleDelete = (configType: BoostConfigType, configName: string) => {
    // TODO: Remove the config file from `baseConfigs`
    onDeleteConfig(configType, configName);
  };

  const handleSelect = (configTypeSelected: BoostConfigType, configName: string) => {

    type payloadType = {[key: string]: string | undefined};
    const payload: payloadType = {};

    // Populate payload with the currently active or sleected config for each config type
    baseConfigs.forEach((config) => {
      if (config.type === configTypeSelected) {
        payload[config.type] = configName;
      }
      else {
        payload[config.type] = config.active;
      }
    }
    );
    console.log('Payload after selection:');
    console.log(payload);
  };

  return (
    <ContentPage title="Boost Configuration">
      <BoostCalibration
        onSet={setCalibration}
        onReset={resetCalibration}
        distTravelled={30}
        calibrationDiff={10}
      />
      <BoostConfigurator
        configs={baseConfigs}
        onSelectConfig={handleSelect}
        onDeleteConfig={handleDelete}
        onUploadConfig={uploadConfig}
      />
    </ContentPage>
  );
}
