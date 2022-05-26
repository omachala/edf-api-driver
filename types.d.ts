export type Credentials = { email: string; password: string };
export type Session = { name: string; value: string; expire: number };
export type ApiRequest = { year?: number; month?: number; session: Session };

type Reading = {
  periodStart: `${number}-${number}-${number}`; // "2022-03-01"
  periodConsumption: number; // kWh
  periodCost: string; // £
  readEstimated: 'N' | 'Y'; // yes/no
  costEstimated: 'N' | 'Y'; // yes/no
};

type DayReading = Reading;
type NightReading = Reading;

type FullDayReading = {
  0: NightReading;
  1: DayReading;
};

type Readings = Record<string, FullDayReading>;

type Result = { division: string; readings: Readings; empty: boolean };

type Needle = Record<string, false | number>;

export type ApiResponse = [{ result: Result; needle: Needle; outcome: string }];
