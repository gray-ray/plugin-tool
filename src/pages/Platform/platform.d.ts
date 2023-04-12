declare namespace PlatformApi {
  type ModuleProp = {
    cardSetting: Record<string, any>;
    name: string;
    default: React.ForwardRefExoticComponent<any>;
    [prop: string]: any;
  };
}
