import * as React from "react";
import {apiGet} from "../api";
// import { DataFeed, widget, GetBarsParams } from "../datafeed/datafeed";
import {DataFeed, widget, GetBarsParams} from "tradingview-api";
import {
    IChartingLibraryWidget,
    Bar,
    LibrarySymbolInfo,
} from "tradingview-api/lib/library.min";
import {ws} from "../utils/socket";

const supported_resolutions = [
    "1",
    "5",
    "15",
    "30",
    "60",
    "240",
    "D",
    "W",
    "M",
];

/**
 * @key Server 端定义字段
 * @value value 对应 supported_resolutions
 */
// 1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1mon, 1week, 1year
const intervalMap = {
    "1min": "1",
    "5min": "5",
    "15min": "15",
    "30min": "30",
    "60min": "60",
    "4hour": "240",
    "1day": "D",
    "1week": "W",
    "1mon": "M",
};

type Props = {
    symbolInfo: any;
};

type IntervalT = keyof typeof intervalMap;

export class KLineWidget extends React.Component<Props> {
    private symbol = this.props.symbolInfo;
    private interval: IntervalT = "5min";
    private _widget?: IChartingLibraryWidget;
    private datafeed = new DataFeed({
        getBars: (params) => this.getBars(params),
        fetchResolveSymbol: () => this.resolveSymbol(),
        fetchConfiguration: () => {
            return new Promise((resolve) => {
                resolve({
                    supported_resolutions: supported_resolutions,
                });
            });
        },
    });

    public resolveSymbol = () => {
        return new Promise<LibrarySymbolInfo>((resolve) => {
            const symbol = this.symbol;
            const info = this.props.symbolInfo;
            resolve({
                name: symbol,
                full_name: symbol,
                description: symbol,
                type: symbol,
                session: "24x7",
                exchange: "HuoBi",
                listed_exchange: symbol,
                timezone: "Asia/Shanghai",
                format: "price",
                // pricescale: Math.pow(10, info["price-precision"]),
                pricescale: 1,
                minmov: 1,
                // volume_precision: info["value-precision"],
                volume_precision: 1,
                has_intraday: true,
                supported_resolutions: supported_resolutions,
            });
        });
    };

    public getBars = async (params: GetBarsParams) => {
        const symbol = this.symbol;
        const size = window.innerWidth;
        if (!params.firstDataRequest /**是否第一次请求历史数据 */) {
            // 火币接口暂时不支持分段查询历史数据
            return {
                bars: [],
                meta: {
                    noData: true,
                },
            };
        }
        if (params.resolution !== intervalMap[this.interval]) {
            this.unsubscribeKLine();
            for (let key in intervalMap) {
                if (intervalMap[key as IntervalT] === params.resolution) {
                    this.interval = key as IntervalT;
                }
            }
        }
        const res = await apiGet<any>(
            "chart",
            `?group=${symbol}&from=0&to=1617008403652&resolution=${intervalMap[this.interval]}`,
            {});
        if (
            params.resolution === intervalMap[this.interval] &&
            params.firstDataRequest &&
            res &&
            res.data.length
        ) {
            this.subscribeKLine();
        }

        if (!res || !res.data || !res.data.length) {
            return {
                bars: [],
                meta: {noData: true},
            };
        }
        const list: Bar[] = [];
        for (let i = 0; i < res.data.length; i++) {
            const item = res.data[i];
            list.push({
                time: item.id * 1000,
                open: item.open,
                high: item.high,
                low: item.low,
                close: item.close,
                volume: item.vol,
            });
        }
        list.sort((l, r) => (l.time > r.time ? 1 : -1));
        return {
            bars: list,
            meta: {
                noData: !list.length,
            },
        };
    };

    public subscribeKLine = () => {
        const symbol = this.symbol;
        ws.subscribe(
            `market.${symbol}.kline.${this.interval}`,
            {
                id: "react-tv",
                sub: `market.${symbol}.kline.${this.interval}`,
            },
            (data) => {
                const tick = data.tick as IApiKLine;
                this.datafeed.updateKLine({
                    time: tick.id * 1000,
                    open: tick.open,
                    high: tick.high,
                    low: tick.low,
                    close: tick.close,
                    volume: tick.vol,
                });
            }
        );
    };

    public unsubscribeKLine = () => {
        const symbol = this.symbol;
        ws.unsubscribe(`market.${symbol}.kline.${this.interval}`);
    };

    public initTradingView = () => {
        const symbol = this.symbol;
        this._widget = new widget({
            // debug: true,
            fullscreen: true,
            symbol: symbol,
            interval: intervalMap[this.interval],
            container_id: "tv_chart_container",
            datafeed: this.datafeed,
            library_path: "/charting_library/",
            locale: "en",
            theme: "Dark",
            timezone: "Asia/Shanghai",
        });
    };

    public setSymbol = (symbol: string) => {
        this.unsubscribeKLine();
        this.symbol = symbol;
        this._widget?.setSymbol(symbol, intervalMap[this.interval], () => {
            // console.log("------setSymbol---------");
        });
    };

    public componentDidMount() {
        this.initTradingView();
    }

    public componentWillUnmount() {
        this._widget && this._widget.remove();
    }

    public render() {
        return (
            <div className="kline">
                <div id="tv_chart_container"></div>
            </div>
        );
    }
}
