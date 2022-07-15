//SPDX-License-Identifier: UNLICENSED

pragma solidity >0.6.10;

/// @title DCVS

contract DCVS{
    
    //Admin address
    address public Admin;
    
    //Constructor to set admin
    constructor() {
        Admin = 0x5CA9499c3Bf66F0DfcA00c3798B8c4E40D2E4ce1;
    }
    
    //Modifier onlyAdmin
    modifier onlyAdmin{
        require(msg.sender==Admin);
        _;
    }
    
   /**
    * @dev struct to hold data
    * 
    * @param fileHash : string, hash of file/content (certificate)
    * @param ipfsHash : string, hash of file in ipfs. (IPFS returned hash)
    * @param certifier : address, certifier address
    * @param timeSTAMP : uint, timeStamp of data storage
   **/
   struct certificateData {
       string fileHash;
       string ipfsHash;
       address certifier;
       uint timeSTAMP;
   }
   
   
   /**
    * @dev struct to hold data of a users
    *
    * @param userAddress : address,user address
    * @param id :  uint, stores id of user
    * @param publicKey : address, stores private key of the user
    * @param name : string, name of user
    */
    struct info{
        string id;
        string name;
        address publicKey;
    }
   
   
   // @mapping : maps, struct certificateData to string, string is Public key of user.
   mapping(address => certificateData) certificateDatas;
   
   // @var : string array, holds all users id
   address[] dataList; 
   
   // @var admin : address, msg.sender address
   address admin = msg.sender;
   
   
    //@mapping : maps, struct info to string, string is ID of user.
    mapping(string => info) infos;
    
    //@var : string array, holds all user id
    string[] infoList;
   
   
   /**
    * @dev function to get data input and store it in dataList array
    * 
    * @param _publicKey : address, publicKey of users
    * @param _fileHash : string, hash of file to be stored
    * @param _ipfsHash: string, hash of file in ipfs to be stored
    * 
    * onlyAdmin can call this function
    * function declares new certificateData type struct, assigns required data and pushes it in dataList array as a tuple
    **/
   function storeData(address _publicKey, string memory _fileHash, string  memory _ipfsHash) public onlyAdmin {
       certificateData storage _certificateData = certificateDatas[_publicKey];
       
       _certificateData.fileHash = _fileHash;
       _certificateData.ipfsHash = _ipfsHash;
       _certificateData.certifier = admin;
       _certificateData.timeSTAMP = block.timestamp;
       
       dataList.push(_publicKey);
   }
   
   /**
     * @dev function to store Infos of user in struct Info and finally push Id in infoList
     * 
     * @param _id : string, _id of user
     * @param _name : string, name of user 
     * @param _publicKey : address, public address of user
     **/
    function storeUserInfo(string memory _id,string memory _name, address _publicKey) public{
        info storage _info = infos[_id];
    
        _info.id = _id;
        _info.name = _name;
        _info.publicKey = _publicKey;
        
        infoList.push(_id);
    }
   
   
   /**
    * function to get data
    * 
    * @param _publicKey : address, publicKey of user whose data is to be displayed
    * return publicKey, fileHash, ipfsHash, certifier, timestamp of provided publicKey
    **/
    function getData(address _publicKey) public view returns(
       address PUBLICKEY__ , string memory FILEHASH__, string memory IPFSHASH__, address certifier, uint TIMESTAMP__){
       return(_publicKey,certificateDatas[_publicKey].fileHash,certificateDatas[_publicKey].ipfsHash,certificateDatas[_publicKey].certifier,certificateDatas[_publicKey].timeSTAMP);
   }
   
    
    /**
     * @dev function to get total ids registeres and get all of these ids
     * 
     * returns total number of ids registered and get all these ids
     * onlyAdmin can call this function
     **/
    function getTotalUser() public view onlyAdmin returns(uint TOTAL__, string[] memory INFOLIST__) {
        return (infoList.length, infoList);
    }
    
    
    /**
     * @dev function to get info of given id
     * 
     * returns id ,name and public key of respective id 
     **/
    function getUserInfo(string memory _id) public view returns(string memory ID_, string memory NAME__,address PUBLICKEY__){
        return (infos[_id].id,infos[_id].name,infos[_id].publicKey);
    }

}