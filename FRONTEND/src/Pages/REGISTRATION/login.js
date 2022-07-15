import axios from 'axios'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import loadWeb3 from '../../utils/web3'
import './login.css'

import { Link } from 'react-router-dom';
import { AiFillSafetyCertificate } from 'react-icons/ai'

class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',

            admin: '',
            web3: null,
            initiatedContract: null,
            walletAccount: ''
        }

        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
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

        let admin = await this.state.initiatedContract.methods.Admin().call()
        this.setState({ admin })
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

    onSubmit(event) {
        event.preventDefault()

        const logged = {
            email: this.state.email,
            password: this.state.password,
            address: this.state.walletAccount.toLowerCase()
        }
        axios.post("http://localhost:9000/login", logged)
            .then(res => {
                const data = res.data.user
                if (data === true) {
                    if (this.state.walletAccount === this.state.admin) {
                        this.props.history.push("/admin")
                    }
                    else {
                        this.props.history.push("/user")
                    }

                }
                else {
                    alert(`
                    Invalid Credentials
                    ---------------------------
                    ---------------------------
                    Note: You may have entered Wrong Email, Password Or
                    Using Wrong Metamask Wallet Account`)
                    this.props.history.push('/login')
                }
            })

        this.setState({
            email: '',
            password: ''
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
                                <Link to='/register' className='nav-links' onClick={this.closeMobileMenu}>
                                    <p className='texts'>SIGN UP</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
  {/* ....................................................................................................................  */}
                <div className="login">
                    <form onSubmit={this.onSubmit}>
                        <h2 className="signInLabel">SIGN IN</h2>
                        
                            <input type='text' className='loginInfo'
                                placeholder='Email'
                                onChange={this.handleEmail}
                                value={this.state.email}
                                required
                            />
                        
                        <br />

                        
                            <input type='password' className='loginInfo'
                                placeholder='Password'
                                onChange={this.handlePassword}
                                value={this.state.password}
                                required
                            />
                       
                        <br />

                        <input className= 'loginButton' type='submit'  value='Login' />


                    </form>

                </div>
            </>
        )
    }
}

export default withRouter(login)