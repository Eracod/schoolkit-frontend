export interface Country {
  capital: string;
  code2: string;
  code3: string;
  name: string;
  region: string;
  subregion: string;
  states: CountryState[];
}

export interface CountryState {
  code: string;
  name: string;
  subdivision: string[];
}
