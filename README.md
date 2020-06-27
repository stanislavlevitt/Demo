**Final Project for Canoe**
<br/>

The DATABASE-SCREENSHOTS folder contains five images of the database. One screenshot of all the models and four individual screenshots of each table.


## Tech Stack

---

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Node](https://nodejs.org/en/)

<br />

## App Walk through

---

<p align="center"><strong>Clients be able view types of funds which they have permission to.</strong></p>
<p align="center"><strong>The types of funds that Clients don’t have permission to will be masked (simple string manipulation: replacing actual words with ***).</strong></p>
<p align="center"><strong>Client 1 can view all types of funds, Client 2 can only view VC and RE funds, Client 3 can only view PL and PC funds.</strong></p>
<p align="center">
  <img src="/public/GetClients.gif"/>
</p>
<br />

<p align="center"><strong> A user should be able to choose existing clients from the Client Name drop down.</strong></p>
<p align="center"><strong>Once a client is selected and the user clicks on Investment Type dropdown, he or she should only see the types of funds invested.</strong></p>
<p align="center"><strong>When client name and fund type are selected and the user clicks on the Investment Name dropdown, the user should only be able to see the investments he or she made.</strong></p>

<p align="center">
 <img src="/public/CashFlow.gif"/>
</p>
<br />

<p align="center"><strong> After Client Name, Investment Type and Investment Name are selected, the Current Value input field should be automatically populated with the latest value from the database.</strong></p>
<p align="center"><strong>When the user types in a new date and value, e.g. 2020-07-01, 10% and clicks on Calculate, the Updated Value input box should be populated with a correct number.</strong></p>
<p align="center"><strong>When user hits submit, the record will be saved into the cash_flows table for the selected investment. When user selected the same investment again, the current value should be updated to the latest one.</strong></p>

## Local Setup

---

**From the terminal run:**

<pre>
git clone https://github.com/stanislavlevitt/Demo
cd Project
npm install
npm start-dev
</pre>

**After npm start-dev**<br />
The App will start running in development mode.<br />
Open [http://localhost:8080](http://localhost:8080)<br />
The page will reload if you make edits.
