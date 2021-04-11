import * as React from "react";
import { apiGet } from "./api";
import { KLineHeader } from "./components/KLineHeader";
import { KLineWidget } from "./components/KLineWidget";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ws } from "./utils/socket";
import {callApi, METHODS} from "./utils/requestUtils";

type Props = {};
type State = {
  symbol: string;
  symbolInfo?: string;
  symbolList: string[];
};
class App extends React.Component<Props, State> {
  private klineRfe: null | KLineWidget = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      symbol: "",
      symbolInfo: void 0,
      symbolList: [],
    };
  }


  public setSymbol = (symbol: string) => {
    const symbolInfo = this.state.symbolList.find((e) => e === symbol);
    if (!symbolInfo) {
      return;
    }
    this.setState({ symbol, symbolInfo });
    this.klineRfe?.setSymbol(symbol);
  };

  public componentDidMount() {
    // ws.initWebSocket();
    // this.fetchSymbolList();
    this.getGroupData();
  }

  public getGroupData(){
    // let url = 'http://103.107.182.29:8000/api/v1/groups/';
    // callApi(url, METHODS.GET)
    //   .then(res => {
    //     if(res.data && res.data.groups){
    //       this.setState({ groups: res.data.groups });
    //     }
    //   })
    //     .catch(err => {
    //       console.log('err', err)
    //     })

    apiGet<any>("groups").then(res => {
      if (!res) {
        return;
      }
      const symbolList = res.groups;
      this.setState({
        symbol: symbolList[0] ?  symbolList[0] : '',
        symbolInfo: symbolList[0] ? symbolList[0] : '',
        symbolList: symbolList,
      });
    });
  }

  public render() {
    const { symbol, symbolInfo, symbolList } = this.state;
    return (
      <div className="App">
        <Grid container spacing={1}>
          <Grid item xs>
            <Paper>
              <KLineHeader
                name={symbol}
                symbols={symbolList}
                onClick={this.setSymbol}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper>
              {symbolInfo && (
                <KLineWidget
                  symbolInfo={symbolInfo}
                  ref={(ref) => (this.klineRfe = ref)}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
