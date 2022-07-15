const iPFS = require('ipfs-http-client')
const IPFS = iPFS.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default IPFS;