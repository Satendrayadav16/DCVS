import React, { Component } from 'react'
import loadWeb3 from '../../utils/web3'
import PdfViewer from '../../utils/singlePage'
import '../Css/user.css'

import { Link } from 'react-router-dom';
import { AiFillSafetyCertificate } from 'react-icons/ai'


export class loggedIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            weB3: null,
            initiatedContract: null,

            details: null,
            loading: false,

            name: '',
            id: '',
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentWillMount() {
        const results = await loadWeb3()
        await this.setState({
            weB3: results.web3,
            initiatedContract: results.initiatedContract
        })
        await this.getAccount()
        await this.getUserInfo()
    }

    async getAccount() {
        const Web3 = this.state.weB3
        const accounts = await Web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }

    async getUserInfo() {
        let info = await this.state.initiatedContract.methods.getUserInfo(this.state.id).call()
        console.log(info)
    }


    async onSubmit(event) {
        event.preventDefault()
        this.setState({ loading: false })

        if (this.state.account === '') {
            alert(`INVALID KEY/ADDRESS TYPE`)
            this.setState({ account: '', loading: false })
        }
        else {
            let detail = await this.state.initiatedContract.methods.getData(this.state.account).call()
            if (detail[1] === '') {
                alert(`NO CERTIFICATE REGISTERED IN GIVEN ADDRESS`)
            }
            else {
                this.setState({
                    details: detail,
                    loading: true
                })
            }
        }
    }


    render() {
        const pdfStyle = {
            border: 5
        }
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
                                <Link to='/' className='nav-links' onClick={this.closeMobileMenu}>
                                    <p className='texts'>LOG OUT</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ........................................................................................................................................................................... */}


                <h3 className="userCertificate">Account : {this.state.account}</h3>

                <br />

                <h1 className='getCertificate'>
                    Get &nbsp;
                    <span> Certificate </span>
                </h1>

                <br />

                <div className='userButtonCert'>
                    <button className='userCert' onClick={this.onSubmit}>Get Certificate</button>

                </div>


                <div class="file">
                    {this.state.loading &&
                        <div className="download">
                            <>
                                <h3 >
                                    <a className='downloadLink' href={`https://ipfs.infura.io/ipfs/${this.state.details[2]}`}
                                        target="_blank" rel="noopener noreferrer">
                                        <p className='certificateDownloadUser'> DOWNLOAD HERE</p>
                                    </a>
                                </h3>
                                <br />
                                <div className='viewPdf' style={pdfStyle}><PdfViewer pdf={`https://ipfs.infura.io/ipfs/${this.state.details[2]}`} /></div>
                            </>
                        </div>
                    }
                </div>

            </>
        )
    }
}

export default loggedIn
