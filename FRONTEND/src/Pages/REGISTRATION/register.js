import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import loadWeb3 from '../../utils/web3'
import './signup.css'

import { Link } from 'react-router-dom';
import { AiFillSafetyCertificate } from 'react-icons/ai'

class register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            id: '',
            email: "",
            password: "",
            reEnterPassword: "",
            address: '',
            initiatedContract: '',

            web3: null,
            signature: '',
            recoveredAccount: '',
            correctAccount: false,
            walletAccount: ''
        }
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handlerePassword = this.handlerePassword.bind(this)
        this.handleID = this.handleID.bind(this)
        this.handleAddress = this.handleAddress.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentWillMount() {
        const results = await loadWeb3()
        await this.setState({
            web3: results.web3,
            initiatedContract: results.initiatedContract
        })
        await this.getAccount()
    }

    async getAccount() {
        const Web3 = this.state.web3
        const accounts = await Web3.eth.getAccounts()
        this.setState({ walletAccount: accounts[0] })
    }

    handleName(event) {
        const name = event.target.value
        this.setState({
            name
        })
    }

    handleEmail(event) {
        const email = event.target.value
        this.setState({
            email
        })
    }

    handlePassword(event) {
        const password = event.target.value
        this.setState({
            password
        })
    }

    handlerePassword(event) {
        const reEnterPassword = event.target.value
        this.setState({
            reEnterPassword
        })
    }

    handleID(event) {
        this.setState({ id: event.target.value })
    }

    handleAddress(event) { this.setState({ address: event.target.value }) }

    async onSubmit(event) {
        event.preventDefault()

        if (this.state.address === this.state.walletAccount) {
            this.setState({
                signature: await this.state.web3.eth.personal
                    .sign(this.state.name, this.state.address, '')
            })

            this.setState({
                recoveredAccount: await this.state.web3.eth.personal
                    .ecRecover(this.state.name, this.state.signature)
            })
            const registered = {
                name: this.state.name,
                id: this.state.id,
                email: this.state.email,
                password: this.state.password,
                reEnterPassword: this.state.reEnterPassword,
                address: this.state.recoveredAccount.toLowerCase()

            }

            axios.post("http://localhost:9000/register", registered)
                .then(res => {
                    if (res.data.user === true) {
                        alert(`Already Registered with Given Address or id`)
                    }
                    else {
                        this.props.history.push("/login")
                    }
                })



        }
        else {
            alert(`Given Account address is not a valid address format or Doesnot matches Metamask Address
            
            SIGN UP AGAIN WITH VALID ADDRESS`)
        }

        this.setState({
            name: "",
            id: '',
            email: "",
            password: "",
            reEnterPassword: "",
            address: ''
        })
    }

    render() {
        return (
            <>

                <div className="navbar">
                    <div className="navbar-container container">
                        <Link to='/' className='navbar-logo' onClick={this.closeMobileMenu}>
                            <AiFillSafetyCertificate className='navbar-icon' />
                            DCVS
                        </Link>

                        <ul className={this.click ? 'nav-menu active' : 'nav-menu'} >

                            <li className='nav-item'>
                                <Link to='/login' className='nav-links' onClick={this.closeMobileMenu}>
                                    <p className='texts'>SIGN IN</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

{/* .................................................................................................................................... */}

                <div className="signup">
                    <form onSubmit={this.onSubmit}>
                        <h2 className='signUpLabel'>SIGN UP</h2>


                        <input className='signUpInfo' type='text'
                            placeholder='NAME'
                            onChange={this.handleName}
                            value={this.state.name}
                            required
                        />
                        <br />

                        <input className='signUpInfo' type='text'
                            placeholder='COLLEGE ID'
                            onChange={this.handleID}
                            value={this.state.id}
                            required
                        />
                        <br />

                        <input className='signUpInfo' type='email'
                            placeholder='EMAIL'
                            onChange={this.handleEmail}
                            value={this.state.email}
                            required
                        />
                        <br />

                        <input className='signUpInfo' type='password'
                            placeholder='PASSWORD'
                            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                            title="Minimum eight characters, at least one letter, one number and one special character"
                            onChange={this.handlePassword}
                            value={this.state.password}
                            required
                        />
                        <br />

                        <input className='signUpInfo' type='password'
                            placeholder='RE ENTER PASSWORD'
                            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                            title="Minimum eight characters, at least one letter, one number and one special character"
                            onChange={this.handlerePassword}
                            value={this.state.repassword}
                            required
                        />
                        <br />

                        <input className='signUpInfo' type='text'
                            placeholder='ADDRESS'
                            onChange={this.handleAddress}
                            value={this.state.address}
                            required
                        />
                        <br />

                        <input type='submit' className='signUpButton' value='Submit' />

                    </form>
                </div>
            </>
        )
    }
}

export default withRouter(register)