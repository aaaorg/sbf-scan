export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ScanResult {
  boundingBox: BoundingBox;
  rawValue: string;
  format: BarcodeType;
  cornerPoints: [
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number }
  ];
}

export type BarcodeType =
  | 'aztec'
  | 'code_128'
  | 'code_39'
  | 'code_93'
  | 'codabar'
  | 'databar'
  | 'databar_expanded'
  | 'data_matrix'
  | 'dx_film_edge'
  | 'ean_13'
  | 'ean_8'
  | 'itf'
  | 'maxi_code'
  | 'micro_qr_code'
  | 'pdf417'
  | 'qr_code'
  | 'rm_qr_code'
  | 'upc_a'
  | 'upc_e'
  | 'linear_codes'
  | 'matrix_codes';
