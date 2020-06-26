import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllClients} from '../store/clients'
import {getFilteredFunds} from '../store/funds'
import {getFilteredInvestment} from '../store/investments'
import {getCashFlowValue, updateCashFlowData} from '../store/cashFlow'
const numeral = require('numeral')

export class CashFlow extends Component {
  constructor() {
    super()
    this.state = {
      clientId: 0,
      fundId: 0,
      investmentId: 0,
      newAmount: '',
      amount: '',
      date: '',
      rate: 0.0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clientChange = this.clientChange.bind(this)
    this.fundChange = this.fundChange.bind(this)
    this.investmentChange = this.investmentChange.bind(this)
    this.dateChange = this.dateChange.bind(this)
    this.rateChange = this.rateChange.bind(this)
    this.calculate = this.calculate.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  componentDidMount() {
    this.props.getAllClients()
  }

  // handleChange(event){
  //   if(event.target.name ===clientId){
  //     this.setState({
  //       [event.target.name]: event.target.value
  //     })
  //     this.props.getFilteredFunds(event.target.value)
  //   }
  //   else if (event.target.name ===fundId){
  //     this.setState({
  //       [event.target.name]: event.target.value
  //     })
  //     this.props.getFilteredInvestment(this.state.clientId, event.target.value)
  //   }
  //   else if (event.target.name ===investmentId){
  //     this.setState({
  //       [event.target.name]: event.target.value
  //     })
  //   }
  // }

  clientChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.getFilteredFunds(event.target.value)
  }

  fundChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.getFilteredInvestment(this.state.clientId, event.target.value)
  }

  investmentChange(event) {
    this.props.getCashFlowValue(event.target.value)

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  dateChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  rateChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  calculate() {
    const value =
      (Number(this.state.rate) + 1) * Number(this.props.cashFlowAmount)
    const strValue = numeral(value.toFixed(2)).format('$0,0.00')
    this.setState({
      newAmount: strValue,
      amount: value.toFixed(2)
    })
  }

  cancel() {
    console.log(this.state)
    this.setState({
      newAmount: '',
      date: '',
      rate: 0
    })
    console.log(this.state)
  }

  handleSubmit() {
    this.props.updateCashFlowData(this.state, this.props.cashFlowId)

    this.setState({
      clientId: 0,
      fundId: 0,
      investmentId: 0,
      newAmount: '',
      amount: '',
      date: '',
      rate: 0
    })
  }

  // eslint-disable-next-line complexity
  render() {
    return (
      <div>
        <h1>Cash Flow</h1>
        <div className="Form">
          <form onSubmit={this.handleSubmit}>
            <div className="Form-Names">
              <select
                id="clientName"
                name="clientId"
                onChange={this.clientChange}
              >
                <option value="" selected>
                  Client Name
                </option>
                {this.props.clients.length > 0 &&
                  this.props.clients.map(client => {
                    return (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    )
                  })}
              </select>
              <select id="fundName" name="fundId" onChange={this.fundChange}>
                <option value="" selected>
                  Investment Type
                </option>
                {this.props.funds.length > 0 &&
                  this.props.funds.map(fund => {
                    if (!fund.name.includes('*')) {
                      return (
                        <option key={fund.id} value={fund.id}>
                          {fund.type}
                        </option>
                      )
                    }
                  })}
              </select>
              <select
                id="investmentName"
                name="investmentId"
                onChange={this.investmentChange}
              >
                <option value="" selected>
                  Investment Name
                </option>
                {this.props.investments.length > 0 &&
                  this.props.investments.map(investment => {
                    return (
                      <option key={investment.id} value={investment.id}>
                        {investment.name}
                      </option>
                    )
                  })}
              </select>
            </div>
            <div className="Form-Values">
              <label htmlFor="currentAmount">Current Value</label>
              <input
                type="text"
                name="currentAmount"
                value={
                  this.props.cashFlowValue === null
                    ? ''
                    : this.props.cashFlowValue
                }
              />
              <label htmlFor="newAmount">Update Value</label>
              <input
                type="text"
                name="newAmount"
                value={this.state.newAmount === '' ? '' : this.state.newAmount}
              />
            </div>
            <div className="Form-Values">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                onChange={this.dateChange}
                value={this.state.date}
                min={new Date().toISOString().slice(0, 10)}
              />
              <label htmlFor="rate">Value</label>
              <input
                type="number"
                name="rate"
                step=".01"
                min="0"
                value={this.state.rate}
                onChange={this.rateChange}
              />
              <button
                type="button"
                disabled={
                  !this.props.cashFlowValue ||
                  this.state.date === '' ||
                  this.state.rate === 0
                }
                onClick={this.calculate}
              >
                Calculate
              </button>
            </div>
            <div className="Form-Buttons">
              <button type="button" onClick={this.cancel}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={this.state.newAmount === '' || this.state.rate === 0}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  clients: state.clients.allClients,
  investments: state.investments.allInvestments,
  funds: state.funds.allFunds,
  cashFlowValue: state.cashFlow.currentValue,
  cashFlowAmount: state.cashFlow.amount,
  cashFlowId: state.cashFlow.id
})

const mapDispatchToProps = dispatch => ({
  getAllClients: () => dispatch(getAllClients()),
  getCashFlowValue: investmentId => dispatch(getCashFlowValue(investmentId)),
  getFilteredFunds: id => dispatch(getFilteredFunds(id)),
  getFilteredInvestment: (clientId, fundId) =>
    dispatch(getFilteredInvestment(clientId, fundId)),
  updateCashFlowData: (obj, id) => dispatch(updateCashFlowData(obj, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CashFlow)
