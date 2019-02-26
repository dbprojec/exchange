import axios from 'axios'
axios.defaults.baseURL = process.env.BASE_URL;

export class HttpUtil {
    static httpUtil: HttpUtil;
    static API_KEY = 'STJXS1XCIR28VUNTG1CCKAQ2BQI6K5V9FG';
    static COIN_API_KEY = '856D86E9-4CF0-473D-96E8-E7F92A30EE90';
    public static ETH_URL = 'https://api.cryptonator.com/api/ticker/eth-usd';
    public static BTC_URL =  'https://api.cryptonator.com/api/ticker/btc-usd';
    private GRAPH_API_KEY = '22d23de9d8c08c7f8cc65e48089e125ed5fa81504b66444c96173b41ba64c177';

    private GRAPH_API_SECRET = '69b417fbf20bca642a9c66b941251859';

    public static BTC_GRAPH_URL = 'https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=10';
    public static ETH_GRAPH_URL = 'https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=USD&limit=10';

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