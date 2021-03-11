import React from 'react';
import ContentPage from 'components/common/ContentPage';
import BoostCalibration from 'components/common/boost/BoostCalibration';
import BoostConfigurator from 'components/common/boost/BoostConfigurator';
import { setCalibration, resetCalibration } from 'api/common/powerModel';
import uploadConfig, {sendConfig} from 'api/v3/boost';
import { BoostConfigType, BoostConfig } from 'types/boost';
import toast from 'react-hot-toast';
import { emit } from 'api/common/socket';

// Only dummy data
const baseConfigs: BoostConfig[] = [
  {
    type: 'powerPlan',
    options: [{fileName: 'my_plan_1.json', displayName: 'my_plan_1'}, {fileName: 'this_one_gets_you_to_144.json', displayName: '144'}],
    active: {fileName: 'my_plan_1.json', displayName: 'my_plan_1'},
  },
  {
    type: 'rider',
    options: [{fileName: 'al.json', displayName: 'AL'}, {fileName: 'charles.json', displayName: 'charles'}],
    active: {fileName: 'charles.json', displayName: 'charles'},
  },
  {
    type: 'bike',
    options: [{fileName: 'blacksmith.json', displayName: 'Black Smith'}, {fileName: 'wombat.json', displayName: 'Wombat'}, {fileName: 'precilla.json', displayName: 'Precilla'}],
    active: {fileName: 'wombat.json', displayName: 'Wombat'},
  },
  {
    type: 'track',
    options: [{fileName: 'ford.json', displayName: 'Ford'}, {fileName: 'holden.json', displayName: 'Holden'}, {fileName: 'battle_mountain.json', displayName: 'Battle Mountain'} ],
    active: {fileName: 'ford.json', displayName: 'Ford'},
  },
];

/**
 * Boost View component
 *
 * @returns {React.Component} Component
 */
export default function BoostView() {
  // TODO: remove the hardcoded value for `distTravelled` with actual value read from MQTT
  
  const sendSelectedConfigChannel = 'submit-selected-configs';
  type selectedConfigType = {[key: string]: string | undefined};

  const handleDelete = (configType: BoostConfigType, configName: string) => {
    // TODO: Remove the config file from `baseConfigs`
    console.log(`Delete ${configName} ${configType} config`);
    sendConfig('delete',configType, JSON.stringify({name: configName}));
    toast.success(`${configName} deleted`);
  };

  const handleSelect = (configTypeSelected: BoostConfigType, configName: string) => {
    const payload: selectedConfigType = {};

    // Populate payload with the currently active or salected config for each config type
    baseConfigs.forEach((config) => {
      if (config.type === configTypeSelected) {
        payload[config.type] = configName;
      }
      else {
        payload[config.type] = config.active?.fileName;
      }
    }
    );
    console.log(`Payload after selection: ${payload}`);
    emit(sendSelectedConfigChannel, JSON.stringify(payload));
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
