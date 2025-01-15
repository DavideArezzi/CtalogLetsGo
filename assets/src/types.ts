
export enum Screen {
    TabNavigator = 'TabNavigator',
    Home = 'Home',
    Favorites = 'Favorites',
  }

export type TabParams = {
  [Screen.Home]: {
    hasFavoritesUpdated: boolean;
  };
  [Screen.Favorites]: {
    hasFavoritesUpdated: boolean;
  };
};

export type MainParamList = {
    TabNavigator: undefined;
    
  };