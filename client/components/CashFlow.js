import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllClients} from '../store/clients'
import {getOnlyFunds,gotFilteredFunds} from '../store/funds'
import {getFilteredInvestment, gotFilteredInvestments} from '../store/investments'
import {
  getCashFlowValue,
  updateCashFlowData,
  gotCashFlowValue
} from '../store/cashFlow'
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
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleClientChange = this.handleClientChange.bind(this)
    this.handleFundChange = this.handleFundChange.bind(this)
    this.handleInvestChange = this.handleInvestChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getAllClients()
    this.props.resetInvestments([])
    this.props.resetFunds([])
  }

  handleClientChange(event){
    if(event.target.value === "") {
      this.props.resetFunds([])
    }
    else{
      this.setState({
        [event.target.name]: event.target.value
      })
      this.props.getOnlyFunds(event.target.value)
    }
      this.props.resetInvestments([])
      this.props.resetCashFlow('', '', null)
  }

  handleFundChange(event){
    if(event.target.value === "") {
      this.props.resetInvestments([])
    }
    else{
      this.setState({
        [event.target.name]: event.target.value
      })
      this.props.getFilteredInvestment(this.state.clientId, event.target.value)
    }
      this.props.resetCashFlow('', '', null)
  }

  handleInvestChange(event){
    if(event.target.value === "") {
      this.props.resetCashFlow('', '', null)
    }
    else{
      this.props.getCashFlowValue(event.target.value)
      this.setState({
      [event.target.name]: event.target.value
      })
    }
  }

  handleValueChange(event){
    if(event.target.name === "date"){
      this.setState({
        [event.target.name]: event.target.value
      })
    }
    else if(event.target.name === "rate"){
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleClick(event){
    if (event.target.name === "cancel"){
      this.setState({
        newAmount: '',
        date: '',
        rate: 0
      })
    }
    else{
      const value =
      (Number(this.state.rate) + 1) * Number(this.props.cashFlowAmount)
    const strValue = numeral(value.toFixed(2)).format('$0,0.00')
    this.setState({
      newAmount: strValue,
      amount: value.toFixed(2)
    })
    }
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
            <div className="Form-Values">
              <select
                id="clientName"
                name="clientId"
                onChange={this.handleClientChange}
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
              <select id="fundName" name="fundId" onChange={this.handleFundChange}>
                <option value="" selected>
                  Investment Type
                </option>
                {this.props.funds.length > 0 &&
                  this.props.funds.map(fund => {
                      return (
                        <option key={fund.id} value={fund.id}>
                          {fund.type}
                        </option>
                      )
                  })}
              </select>
              <select
                id="investmentName"
                name="investmentId"
                onChange={this.handleInvestChange}
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
              <div className="Form-Group">
                <label htmlFor="currentAmount">Current Value</label>
                <input
                  type="text"
                  name="currentAmount"
                  value={
                    this.props.cashFlowValue === ''
                      ? ''
                      : this.props.cashFlowValue
                  }
                />
              </div>
              <div className="Form-Group">
                <label htmlFor="newAmount">Update Value</label>
                <input
                  type="text"
                  name="newAmount"
                  value={
                    this.state.newAmount === '' ? '' : this.state.newAmount
                  }
                />
              </div>
            </div>
            <div className="Form-Values">
              <div className="Form-Group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={this.handleValueChange}
                  value={this.state.date}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div className="Form-Group">
                <label htmlFor="rate">Value</label>
                <input
                  type="number"
                  name="rate"
                  step=".01"
                  min="0"
                  value={this.state.rate}
                  onChange={this.handleValueChange}
                />
              </div>
              <button
                type="button"
                id="calculate"
                disabled={
                  !this.props.cashFlowValue ||
                  this.state.date === '' ||
                  this.state.rate === 0
                }
                onClick={this.handleClick}
              >
                Calculate
              </button>
            </div>
            <div className="Form-Values">
              <button type="button" onClick={this.handleClick} name="cancel">
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
  getOnlyFunds: id => dispatch(getOnlyFunds(id)),
  getFilteredInvestment: (clientId, fundId) =>
    dispatch(getFilteredInvestment(clientId, fundId)),
  updateCashFlowData: (obj, id) => dispatch(updateCashFlowData(obj, id)),
  resetCashFlow: (amountWithRate, amountBeforeRate, id) =>
    dispatch(gotCashFlowValue(amountWithRate, amountBeforeRate, id)),
    resetInvestments: (invest)=> dispatch(gotFilteredInvestments(invest)),
    resetFunds: (funds)=> dispatch(gotFilteredFunds(funds))
})

export default connect(mapStateToProps, mapDispatchToProps)(CashFlow)
