import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL;

export class HttpUtil {
    static httpUtil: HttpUtil;
    static API_KEY = 'STJXS1XCIR28VUNTG1CCKAQ2BQI6K5V9FG';
    static COIN_API_KEY = '856D86E9-4CF0-473D-96E8-E7F92A30EE90';
    public static ETHER_URL = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${HttpUtil.API_KEY}`;
    public static BTC_URL =  'https://rest.coinapi.io/v1/exchangerate/BTC';
    public static getInstance(): HttpUtil {
        if (this.httpUtil != null) {
            return this.httpUtil
        } else {
            this.httpUtil = new HttpUtil();
            return this.httpUtil
        }
    }
    private constructor() { }

    private _cache: any = {}

    fetchData(url: string) {
        if (Object.keys(this._cache).indexOf(url) > -1) {
            console.log(this._cache[url])
            return new Promise((succeed, fail) => {
                succeed({data: this._cache[url].data})
            })
        } else {
            // alert("returning from network")
            return fetch(url, {
                method: 'GET',
                headers: {
                    "content-type": "application/json; charset=utf-8",
                    "X-CoinAPI-Key": HttpUtil.COIN_API_KEY
                }
            }).then((res: any) => {
                this._cache[url] = res
                return res
            })
        }
    }

    public cache(url: string, data: any) {
        if (Object.keys(this._cache).indexOf(url) < 0) {
            this._cache[url] = data
        }
    }
}