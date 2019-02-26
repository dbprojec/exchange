import React, { Component } from 'react'
import {HttpUtil} from '../utils/http.util.ts'
import Typography from '@material-ui/core/Typography';
var LineChart = require("react-chartjs").Line;

export default class Graph extends Component {
  
  httpUtil = HttpUtil.getInstance()
  state = {
    data: [],
    titles: {
      '/btc': 'Bitcoin',
      '/eth': 'Etherium'
    },
    url: ''
  }

  constructor(props) {
    super(props)
    this.fetchData = this.fetchData.bind(this)

  }
  componentWillMount() {
    this.setState({url: this.props.location.pathname})
    if (this.state.url === '/btc') {
      this.fetchData(HttpUtil.ETHER_URL)
    } else {
      this.fetchData(HttpUtil.ETHER_URL)
    }
  }

  fetchData(url) {
    this.httpUtil.fetchData(url).then(data => console.log(data))
  }

  render() {
    // const url = "https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json"
    return (
      <div>
        <Typography className="header" variant="h2">{this.state.titles[this.state.url]}</Typography>
        <LineChart data={this.state.data} options={this.props} width="600" height="250"/>
      </div>
    )
  }
}
