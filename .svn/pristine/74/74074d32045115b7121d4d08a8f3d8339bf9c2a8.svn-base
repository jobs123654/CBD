import axios from "axios";
const mockURL = '/mock';
const path = config.moudlePath
const ZXQAPI = config.ZXQAPI[0]
const GNQAPI = config.GNQAPI[0]

export const getData = async param => {
  let data = await axios(`${mockURL}/`);
};

export const getJX = async param => {
  let data = await axios(`/geojson/DOMAIN_XJ_CBD.json`);
  return data.data.features;
};

export const getLY = async param => {
  let data = await axios(`/geojson/LY_CBD.json`);
  return data.data.features;
};

export const getXY = async param => {
  let data = await axios(`/geojson/cbd经营地址.json`);
  return data.data.features;
};

export const getQY = async param => {
  let data = await axios(`/geojson/cbd经营地址.json`);
  return data.data.features;
};




/*大屏图表数据*/

/*返回GDP占比
* 根据param更新对应的图表
* 0 功能区
* 1 中心区
* */
export const getGDPZB = async param => {

  let data = '';
  if (param) {
    data = await axios(path+ZXQAPI['GDPZB']);
  } else {
    data = await axios(path+GNQAPI['GDPZB']);
  }
  return data
}


/*
*返回历年GDP收入
* */
export const getGDPIncome = async param => {
  let data = '';
  if (param) {
    data = await axios(path + ZXQAPI['GDPIncome']);
  } else {
    data = await axios(path + GNQAPI['GDPIncome']);
  }
  return data
}


/*
* 历年税收收入
* */
export const getTaxIncome = async param => {

  let data = '';
  if (param) {
    data = await axios(path  + ZXQAPI['TaxIncome']);
  } else {
    data = await axios(path  + GNQAPI['TaxIncome']);
  }
  return data
}
/*
*历年税收占比
* */
export const getTaxIncomeZB = async param => {
  let data = '';
  if (param) {
    data = await axios(path+ZXQAPI['TaxIncomeZB']);
  } else {
    data = await axios(path+GNQAPI['TaxIncomeZB']);
  }
  return data
}

/*
* 历年资产规模
*
* */
export const getAssetSize = async param => {

  let data = '';
  if (param) {
    data = await axios(path+ZXQAPI['AssetSize']);
  } else {
    data = await axios(path+GNQAPI['AssetSize']);
  }
  return data
}

/*
/!*
* 历年资产规模占比
*
* */

export const getAssetSizeZB = async param => {

  let data = '';
  if (param) {
    data = await axios(path+ZXQAPI['AssetSizeZB']);
  } else {
    data = await axios(path+GNQAPI['AssetSizeZB']);
  }
  return data
}

