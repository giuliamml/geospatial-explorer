export type FeatureCollection = {
  type: "FeatureCollection";
  stac_version: string;
  stac_extensions: string[];
  context?: {
    limit: number;
    matched: number;
    returned: number;
  };
  numberMatched: number;
  numberReturned: number;
  features: Feature[];
  links: Link[];
  // Type for geoJSON file upload
  bbox?: number[];
};

export type Feature = {
  type: "Feature";
  stac_version: string;
  stac_extensions: string[];
  id: string;
  description: string;
  bbox: number[];
  geometry: Geometry;
  properties: Properties;
  assets: { [key: string]: Asset };
  links: Link[];
  collection: string;
};

export type Geometry = {
  type: "Polygon";
  coordinates: number[][][];
};

export type Properties = {
  datetime: string;
  [key: string]: any;
};

type Asset = {
  title: string;
  description?: string;
  type: string;
  roles: string[];
  href: string;
  alternate?: any;
  eo: Band[];
  classification: Bitfield[];
};

type Band = {
  name: string;
  common_name: string;
  gsd: number;
  center_wavelength: number;
};

type Bitfield = {
  name: string;
  description: string;
  offset: number;
  length: number;
  classes: Class[];
};

type Class = {
  name: string;
  description: string;
  value: number;
};

type Link = {
  rel: string;
  href: string;
  type?: string;
  title?: string;
  method?: string;
};


type Dates = [string, string] | [null, null];