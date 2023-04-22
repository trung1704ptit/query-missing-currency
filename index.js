const fs = require('fs');
const axios = require('axios');

const symbolsList = [
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'JPY',
  'INR',
  'CNY',
  'BRL',
  'SGD',
  'RUB',
  'VND',
  'KRW',
  'HKD',
  'SEK',
  'CHF',
  'XAF',
  'AFN',
  'ALL',
  'DZD',
  'AOA',
  'XCD',
  'ARS',
  'AMD',
  'AZN',
  'BSD',
  'BHD',
  'BDT',
  'BBD',
  'BYN',
  'BZD',
  'XOF',
  'BTN',
  'BOB',
  'BAM',
  'BWP',
  'BND',
  'BGN',
  'BIF',
  'KHR',
  'CVE',
  'CLP',
  'COP',
  'KMF',
  'CRC',
  'CUP',
  'CZK',
  'CDF',
  'DKK',
  'DJF',
  'DOP',
  'EGP',
  'SZL',
  'ETB',
  'FJD',
  'GMD',
  'GEL',
  'GHS',
  'GTQ',
  'GNF',
  'GYD',
  'HTG',
  'HNL',
  'HUF',
  'ISK',
  'IDR',
  'IRR',
  'IQD',
  'ILS',
  'JMD',
  'JOD',
  'KZT',
  'KES',
  'KWD',
  'KGS',
  'LAK',
  'LBP',
  'LSL',
  'LRD',
  'LYD',
  'MGA',
  'MWK',
  'MYR',
  'MVR',
  'MRU',
  'MUR',
  'MXN',
  'MDL',
  'MAD',
  'MZN',
  'MMK',
  'NAD',
  'NPR',
  'NZD',
  'NIO',
  'NGN',
  'MKD',
  'NOK',
  'OMR',
  'PKR',
  'PAB',
  'PGK',
  'PYG',
  'PEN',
  'PHP',
  'PLN',
  'QAR',
  'RON',
  'RWF',
  'SAR',
  'RSD',
  'SCR',
  'SLL',
  'SBD',
  'SOS',
  'ZAR',
  'LKR',
  'SDG',
  'SRD',
  'TWD',
  'TJS',
  'TZS',
  'THB',
  'TOP',
  'TTD',
  'TND',
  'TRY',
  'TMT',
  'UGX',
  'UAH',
  'AED',
  'UYU',
  'UZS',
  'YER',
  'ZMW',
];

const query = async (iso) => {
  try {
    let { data } = await axios.get(
      `https://currency.apiup.org/api/v1/currency/rates?from=${iso}`,
    );
    if (data) {
      return data.rates;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const checking = async () => {
  try {
    const results = [];
    const symbols = [...new Set(symbolsList)];
    for(item of symbols) {
      console.log('=>>> ', item)
      let rates = await query(item);
      if (rates) {
        rates = rates.map(r => r.to);
        const filterNotExist = symbols.filter(s => !rates.includes(s));
        if (filterNotExist.length > 0) {
          filterNotExist.forEach(f => {
            if (item !== f) {
              results.push(`https://www.google.com/finance/quote/${item}-${f}`);
            }
          })
        }
      } else {
        console.log('empty currency:', item);
      }
    };

    fs.writeFile("output.json", JSON.stringify({ results }, null, 2) , 'utf8', function (err) {
      if (err) {
      console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
  
      console.log("JSON file has been saved.");
  });
  } catch (error) {
    console.log(error);
  }
};

checking();