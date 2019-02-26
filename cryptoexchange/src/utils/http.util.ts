import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL;

export class HttpUtil {
    static httpUtil: HttpUtil;
    static API_KEY = 'STJXS1XCIR28VUNTG1CCKAQ2BQI6K5V9FG';
    static COIN_API_KEY = '856D86E9-4CF0-473D-96E8-E7F92A30EE90';
    public static ETH_URL = 'https://api.cryptonator.com/api/ticker/eth-usd';
    public static BTC_URL =  'https://api.cryptonator.com/api/ticker/btc-usd';
    public static BTC_GRAPH_URL = 'https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json'
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
            console.log(this._cache[url].data)
            return new Promise((succeed, fail) => {
                succeed({...this._cache[url].data})
            })
        } else {
            // alert("returning from network")
            return axios.get(url, {
                headers: {
                    "content-type": "application/json; charset=utf-8"
                }
            }).then((res: any) => {
                this._cache[url] = res
                return res.data
            })
        }
    }

    public cache(url: string, data: any) {
        if (Object.keys(this._cache).indexOf(url) < 0) {
            this._cache[url] = data
        }
    }
}