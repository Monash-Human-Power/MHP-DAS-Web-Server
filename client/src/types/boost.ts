export type BoostConfigType = 'powerPlan' | 'rider' | 'bike' | 'track' | 'all';

type configName = {
  displayName: string;
  fileName: string;
};

export interface BoostConfig {
  /** The input of BOOST that this config is for */
  type: BoostConfigType;
  /** List of available BOOST configuration files */
  options: configName[];
  /** Currently selected BOOST configuration */
  active?: configName;
}

