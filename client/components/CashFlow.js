import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllClients} from '../store/clients'
import {getFilteredFunds} from '../store/funds'
import {getFilteredInvestment} from '../store/investments'
import {getCashFlowValue} from '../store/cashFlow'

export class CashFlow extends Component {
  constructor() {
    super()
    this.state = {
      clientId: 0,
      fundId: 0,
      investmentId: 0,
      amount: '',
      date: '',
      rate: 0.0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clientChange = this.clientChange.bind(this)
    this.fundChange = this.fundChange.bind(this)
    this.investmentChange = this.investmentChange.bind(this)
  }

  componentDidMount() {
    this.props.getAllClients()
  }

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
      [event.target.name]: event.target.value,
      amount: this.props.cashFlowValue
    })
  }

  handleSubmit(event) {
    this.setState({
      clientName: '',
      fundName: '',
      investmentName: '',
      amount: 0,
      date: '',
      return: 0.0
    })
  }

  render() {
    return (
      <div>
        <h1>Cash Flow</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="Form-Names">
            <select
              id="clientName"
              name="clientId"
              onChange={this.clientChange}
            >
              <option value="" disabled selected hidden>
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
              <option value="" disabled selected hidden>
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
              <option value="" disabled selected hidden>
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
            <input type="number" name="newAmount" value={this.state.amount} />
          </div>
          <div className="Form-Values">
            <label htmlFor="date">Date</label>
            <input type="date" name="date" value={this.state.date} />
            <label htmlFor="rate">Value</label>
            <input type="number" name="rate" value={this.state.rate} />
            <button type="button">Calculate</button>
          </div>
          <div className="Form-Buttons">
            <button type="button">Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  clients: state.clients.allClients,
  investments: state.investments.allInvestments,
  funds: state.funds.allFunds,
  cashFlowValue: state.cashFlow.currentValue
})

const mapDispatchToProps = dispatch => ({
  getAllClients: () => dispatch(getAllClients()),
  getCashFlowValue: investmentId => dispatch(getCashFlowValue(investmentId)),
  getFilteredFunds: id => dispatch(getFilteredFunds(id)),
  getFilteredInvestment: (clientId, fundId) =>
    dispatch(getFilteredInvestment(clientId, fundId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CashFlow)
