import React, { Component } from 'react'
import {HttpUtil} from '../utils/http.util.ts'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Chart from "react-apexcharts";

var LineChart = require("react-chartjs").Line;
const styles = {
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    maxWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Graph extends Component {
  
  httpUtil = HttpUtil.getInstance()
  state = {
    data: [],
    titles: {
      '/btc': 'Bitcoin',
      '/eth': 'Etherium'
    },
    url: '',
    loaded: false,
    graphData: {
      categories: [],
      series: {
        name: "history",
        data: []
      }
    },
    urlSet: false

  }

  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this)
  }
  componentWillUnmount() {
    this.setState({loaded: false})
  }
  componentDidMount() {
    this.setState({url: this.props.location.pathname, urlSet: true})
    if (this.props.location.pathname.indexOf('/btc') > -1) {
      this.fetchData(HttpUtil.BTC_URL, HttpUtil.BTC_GRAPH_URL)
    } else {
      this.fetchData(HttpUtil.ETH_URL, HttpUtil.ETH_GRAPH_URL)
    }
  }

  fetchData(url, graph_url) {
    this.httpUtil.fetchData(url).then(data => this.setState({data: data}))
    this.httpUtil.fetchData(graph_url).then(data => {
      const cats = []
      const records = []
      let i = 0;
      for (const record of data.Data) {
        cats.push(new Date(record.time).getMinutes())
        records.push(record.close)
        i += 1;
        if (i == data.Data.length) {
          break;
        }
        
      }
      this.setState({
        graphData: {
          categories: cats,
          series: {
            data: records
          }
        },
        loaded: true
      })
      
    })
  }

  render() {
    const {classes} = this.props;
    
    // const url = "https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json"
    return (
      !this.state.loaded?(<div></div>):(
        <div className={classes.center}>
        <Typography className="header" variant="h2">{this.state.titles[this.state.url]}</Typography>
        <Chart
              options={
                {
                  xaxis: {
                    categories: this.state.graphData.categories,
                  }
                }
              }
              series={[this.state.graphData.series]}
              type="line"
              width="700"
            />
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom>
              {this.state.titles[this.state.url]}
            </Typography>
            <Typography variant="h5" component="h2">
            </Typography>
            <Typography color="textSecondary">
              ${this.state.data.ticker.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Details</Button>
          </CardActions>
        </Card>
      </div>
      )
    )
  }
}

export default withStyles(styles)(Graph);
