import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { VscGithub } from 'react-icons/vsc'

import loadWeb3 from '../../utils/web3'
import CRYPTO from 'crypto'
import '../Css/home.css';




class home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initiatedContract: null,
            weB3: null,
            fileHash: '',
            id: '',

            contractFileHash: '',
            loading: false,
            //  uploadedDetails : null,
            compared: false,
            click: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.captureFile = this.captureFile.bind(this)
        this.handleID = this.handleID.bind(this)
        this.closeMobileMenu = this.closeMobileMenu.bind(this)
    }

    async componentWillMount() {
        const results = await loadWeb3()
        await this.setState({
            weB3: results.web3,
            initiatedContract: results.initiatedContract
        })
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

    // async handleID(event) {
    //     event.preventDefault()
    //     const iD = event.target.value
    //     this.setState({ id: iD })
    // }
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
        if (this.state.id === '') {
            alert(`INVALID KEY/ADDRESS TYPE`)
            this.setState({ id: '', loading: false })
        }
        else {
            let detail = await this.state.initiatedContract.methods.getData(this.state.id).call()
            if (detail[1] === '') {
                alert(`NO CERTIFICATE REGISTERED IN GIVEN ADDRESS`)
            }
            else {
                this.setState({
                    contractFileHash: detail[1],
                })
                this.comparison()
            }
        }
    }

    comparison() {
        (this.state.contractFileHash === this.state.fileHash)
            ? this.setState({ compared: true, loading: true })
            : this.setState({ compared: false, loading: true })

    }

    closeMobileMenu(event) {
        this.setState({ click: true })
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
                            <li className='nav-item'>
                                <Link to='/register' className='nav-links' onClick={this.closeMobileMenu}>
                                    <p className='texts'>SIGN UP</p>
                                </Link>
                            </li>
                            <a className='github-logo' target="example" href="https://github.com/Digital-Certificate-Verification-System/dcvs-react"><VscGithub className='github-icon' /></a>
                        </ul>
                    </div>
                </div>
 
    {/* ............................................................................................................................ */}

                <br/><br/><br/><br/>
                <header class="certificate">
                    {/* <div className="Cert"> */}
                    <h1>
                        VERIFY
                        <span> CERTIFICATE </span>
                    </h1>
                    {/* </div> */}
                    
                </header>
                <br/>
                <div className="content">
                    <div className="FileUpload">

                        {/* <h3>Verify the Certificate</h3> */}
                        <form classname= "inputs" onSubmit={this.onSubmit}>
                            <label className='uploading'>UPLOAD FILE :</label>
                            <input type='file' className='fileInput' onChange={this.captureFile} accept='.pdf' required />
                            <br /><br />
                            <label className='pid'>PUBLIC ADDRESS : &nbsp;
                                <input size='80' className="inputType" type='text' placeholder="Enter Public Address" onChange={this.handleID} required />
                            </label>
                            &nbsp;
                            <input className='homeSubmit' type='submit' value='VERIFY' />
                        </form>
                    </div>
                </div>
                <br /><br />

                {this.state.loading &&
                    <div>
                        <div className="Filemessage">
                            {(this.state.compared === true)
                                ? <h2>CERTIFICATE VERIFIED </h2>
                                : <h2>Couldnot Verify Certificate</h2>}
                        </div>

                        <br /><br/><br/>

                        <hr />
                       

                        <div className="HASH">
                            <br/>
                            <label className='iname'>INSERTED FILE HASH: </label>
                             <label className='ivalue'>{this.state.fileHash}</label>
                            <br/><br/>
                            <label className='iname'>STORED CERTIFICATE HASH: </label> 
                            <label className='ivalue'> {this.state.contractFileHash}</label>
                        </div>
                    </div>
                }

            </>
        )
    }
}
export default home;