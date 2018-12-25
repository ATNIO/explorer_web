pragma solidity >0.4.99 <0.6.0;

contract ANS {
    
    struct NameSpace {
        string name;
        bytes32 content;
        uint256 price;
    }
    
    struct Bid {
        address payable bider;
        uint256 price;
        uint256 blockNo;
    }
    
    address payable atnAddr = 0x0000000000000000000000000000000000000001;
    address payable atmAddr = 0x0000000000000000000000000000000000000002;
    uint256 constant c_fee = 1 ether;
    uint256 constant freeze = 100;
    
    mapping(address=>NameSpace) public nss;
    mapping(string=>address payable) binss;
    mapping(string=>Bid) aucts;
    mapping(address=>string) biaucts;
    
    event EventRegister(address _from, string _name);
    event EventUnRegister(address _from, string _name);
    event EventSetPrice(address _from, string _name, uint256 _price);
    event EventSetContent(address _from, string _name, bytes32 _content);
    event EventContentAndPrice(address _from, string _name, bytes32 _content, uint256 _price);
    event EventBuy(address _from, address _to, uint256 _price);
    event EventBidPrice(address _from, string _name, uint256 _price);
    event EventSell(address _from, address _to, string _name, uint256 _price);
    event EventReBid(address _from, string _name, uint256 _price);
    
    modifier validate(string memory _str) {
        bytes memory b = bytes(_str);
        bool flag = true;
        if(b.length < 3 || b.length > 16) flag = false;
        for(uint i; i<b.length; i++){
            bytes1 char = b[i];
            if(
                !(char >= 0x30 && char <= 0x39) && //9-0
                !(char >= 0x41 && char <= 0x5A) && //A-Z
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char == 0x2E) //.
            )
                flag = false;
        }
        require(
            flag == true,
            "string contains only alphanumeric character."
        );
        _;
    }
    
    modifier nonaddr(address _addr) {
        require(bytes(nss[_addr].name).length == 0);
        _;
    }
    
    modifier nonname(string memory _name) {
        require(bytes(_name).length > 0);
        require(binss[_name] == address(0));
        _;
    }
    
    modifier owner() {
        require(bytes(nss[msg.sender].name).length > 0);
        require(binss[nss[msg.sender].name] == msg.sender);
        _;
    }
    
    modifier nonsell() {
        require(bytes(nss[msg.sender].name).length > 0);
        require(nss[msg.sender].price == 0);
        _;
    }
    
    modifier nonbid() {
        require(bytes(biaucts[msg.sender]).length == 0);
        _;
    }
    
    modifier onsell(string memory _name) {
        require(nss[binss[_name]].price > 0);
        _;
    }
    
    constructor() public {
        nss[atnAddr] = NameSpace({
            name: "ATN",
            content: 0,
            price: 0
        });
        binss["ATN"] = atnAddr;
        emit EventRegister(atnAddr, "ATN");
        nss[atmAddr] = NameSpace({
            name: "ATMatrix",
            content: 0,
            price: 0
        });
        binss["ATMatrix"] = atmAddr;
        emit EventRegister(atmAddr, "ATMatrix");
    }
    
    function getNameSpace(string memory _name) validate(_name) view public returns (address addr, uint256 price, string memory name) {
        addr = binss[_name];
        name = nss[addr].name;
        price = nss[addr].price;
    }
    
    function getAuction(string memory _name) validate(_name) view public returns (address addr, uint256 price, uint256 blockNo) {
        addr = aucts[_name].bider;
        price = aucts[_name].price;
        blockNo = aucts[_name].blockNo;
    }
    
    function getAuction(address _addr) view public returns (uint256 price, uint256 blockNo, string memory name) {
        name = biaucts[_addr];
        price = aucts[name].price;
        blockNo = aucts[name].blockNo;
    }
    
    function register(string memory _name) validate(_name) nonaddr(msg.sender) nonname(_name) nonbid() payable public {
        require(msg.value == c_fee);
        nss[msg.sender] = NameSpace({
            name: _name,
            content: 0,
            price: 0
        });
        binss[_name] = msg.sender;
        emit EventRegister(msg.sender, _name);
    }
    
    function unregister() owner() nonsell() public {
		string memory name = nss[msg.sender].name;
        delete nss[msg.sender];
        delete binss[name];
        msg.sender.transfer(c_fee);
        emit EventUnRegister(msg.sender, name);
	}
    
    function setPrice(uint256 _price) owner() public {
        NameSpace storage ns = nss[msg.sender];
        ns.price = _price;
        emit EventSetPrice(msg.sender, ns.name, ns.price);
    }
    
    function setContent(bytes32 _content) owner() public {
        NameSpace storage ns = nss[msg.sender];
        ns.content = _content;
        emit EventSetContent(msg.sender, ns.name, ns.content);
    }
    
    function setContentAndPrice(bytes32 _content, uint256 _price) owner() public {
        NameSpace storage ns = nss[msg.sender];
        ns.content = _content;
        ns.price = _price;
        emit EventContentAndPrice(msg.sender, ns.name, ns.content, ns.price);
    }
    
    function buy(string memory _name) validate(_name) nonaddr(msg.sender) onsell(_name) nonbid() payable public {
        address payable _from = binss[_name];
        uint256 price = nss[_from].price;
        require(msg.value == price);
        delete nss[_from];
        delete binss[_name];
        nss[msg.sender] = NameSpace({
            name: _name,
            content: 0,
            price: 0
        });
        binss[_name] = msg.sender;
        _from.transfer(price);
        emit EventBuy(_from, msg.sender, price);
    }
    
    function bidPrice(string memory _name) validate(_name) nonaddr(msg.sender) nonbid() payable public {
        Bid storage bid = aucts[_name];
        require(msg.value > bid.price);
        bid.bider.transfer(bid.price);
        delete biaucts[bid.bider];
        bid.bider = msg.sender;
        bid.price = msg.value;
        bid.blockNo = block.number;
        biaucts[msg.sender] = _name;
        emit EventBidPrice(msg.sender, _name, msg.value);
    }
    
    function reBid() public{
        string memory name = biaucts[msg.sender];
        require(bytes(name).length > 0);
        Bid memory bid = aucts[name];
        require(block.number > bid.blockNo + freeze);
        require(msg.sender == bid.bider);
        require(bid.price > 0);
        msg.sender.transfer(bid.price);
        delete biaucts[bid.bider];
        delete aucts[name];
        emit EventReBid(msg.sender, name, bid.price);
    }
    
    function sell(address payable _to) owner() nonaddr(_to) public {
        string memory name = nss[msg.sender].name;
        delete nss[msg.sender];
        delete binss[name];
        nss[_to] = NameSpace({
            name: name,
            content: 0,
            price: 0
        });
        binss[name] = _to;
        uint256 price = aucts[name].price;
        msg.sender.transfer(price);
        delete biaucts[aucts[name].bider];
        delete aucts[name];
        emit EventSell(msg.sender, _to, name, price);
    }
}
