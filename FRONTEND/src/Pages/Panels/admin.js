import React, { Component } from 'react'
import loadWeb3 from '../../utils/web3'
import IPFS from '../../utils/ipfs'
import CRYPTO from 'crypto'
import '../Css/admin.css'

import { Link } from 'react-router-dom';
import { AiFillSafetyCertificate } from 'react-icons/ai'



class Admin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            initiatedContract: null,
            weB3: null,
            buffer: null,
            ipfsHash: '',
            fileHash: '',
            id: '',
            Submitted: false,
            uploadedDetails: null,
            loading: false
        }
        this.captureFile = this.captureFile.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleID = this.handleID.bind(this)
        this.onDetail = this.onDetail.bind(this)
    }

    async componentWillMount() {

        const results = await loadWeb3()
        await this.setState({
            weB3: results.web3,
            initiatedContract: results.initiatedContract
        })
        await this.getAccount()
    }

    async getAccount() {
        const Web3 = this.state.weB3
        const accounts = await Web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }

    async captureFile(event) {
        event.preventDefault()

        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) })
            const hex = CRYPTO.createHash('sha256').update(this.state.buffer).digest('hex')
            this.setState({ fileHash: hex })
        }
    }


 

    async handleID(event) {
        event.preventDefault()
        const iD = event.target.value
        if (this.state.weB3.utils.isAddress(iD)) {
            this.setState({ id: iD })
            console.log(this.state.id)
        }
        else {
            this.setState({ id: '' })

        }
    }

    async onSubmit(event) {
        event.preventDefault()
        if (this.state.id === "") {
            alert(`Address type error`)
            this.setState({ id: '', loading: false })
        }
        else {
            const { cid } = await IPFS.add(this.state.buffer)
            const ipfsHash = cid.toString()
            this.setState({ ipfsHash })
            await this.state.initiatedContract.methods.storeData(
                this.state.id,
                this.state.fileHash,
                this.state.ipfsHash,
            ).send({ from: this.state.account }, function (error, transactionHash) {

            })
            this.setState({ Submitted: true  });

        }

    }

    async onDetail(event) {
        let detail = await this.state.initiatedContract.methods.getData(this.state.id).call()
        this.setState({
            uploadedDetails: detail
        })
        this.setState({ loading: true })

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
                                <Link to='/' className='nav-links' onClick={this.closeMobileMenu}>
                                    <p className='texts'>LOG OUT</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ............................................................................................................................. */}



                <h8 className='adminAddress'>Account : {this.state.account}</h8>

                <h1 className='adminUpload'>Upload File</h1>

                <div className='AdminPage'>

                    <form onSubmit={this.onSubmit}>
                        <label className='adminUploadText'>UPLOAD FILE : &nbsp;
                            <input className='adminInput' type='file' onChange={this.captureFile} accept=".pdf" required />
                        </label>
                        <br /><br />
                        <label className='pubAddText'>PUBLIC ADDRESS : &nbsp;
                            <input className='adminInputPubAdd' size="80" type='text' placeholder="Enter Public Address" onChange={this.handleID} required />
                        </label>

                        <input className='adminSubmit' type='submit' value='UPLOAD' />
                    </form>
                    <br />
                </div>


                {this.state.Submitted &&
                    <div className='Detail' >
                        <h3 className='sucessfullMessage'>File Uploaded Successfully</h3><br /><br />

                        <button className='getDetailsDataButton' onClick={this.onDetail}>Get Detail</button>
                        <br />
                        {this.state.loading &&
                            <>
                                <h3 className="UploadDetailsText">UPLOAD DETAILS</h3>
                                <div className='adminCertDetails'>
                                    &nbsp;
                                    <label className='aInfoTextP'>ADDRESS  : &nbsp; </label> <label className='aInfoDetailP'>{this.state.uploadedDetails[0]}</label>
                                    <br /><br />
                                    <label className='aInfoTextF'>FILE HASH  : &nbsp; </label> <label className='aInfoDetailF'>{this.state.uploadedDetails[1]}</label>
                                    <br /><br />
                                    <label className='aInfoTextI'>IPFS HASH  :  &nbsp; </label> <label className='aInfoDetailI'>{this.state.uploadedDetails[2]}</label>
                                    <br /><br />
                                    <label className='aInfoTextC'>CERTIFIER  : &nbsp; </label> <label className='aInfoDetailC'> {this.state.uploadedDetails[3]}</label>
                                    <br /><br />
                                    <label className='aInfoTextT'>TIME STAMP : &nbsp; </label> <label className='aInfoDetailT'> {this.state.uploadedDetails[4]}</label>
                                    <br /><br />
                                </div>
                            </>
                        }
                    </div>
                }
            </>
        )
    }


}
export default Admin;
