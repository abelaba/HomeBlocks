// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract PropertyManagment {
    uint256 public propertyCount = 0;

    struct PropertyStruct {
        uint256 propertyCount;
        address owner;
        string userId;
        string name;
        string description;
        string propertyAddress;
        int256 price;
        string propertyOwnershipHash;
        bool available;
        uint256 timestamp;
        address tenant;
        uint256 paymentDate;
        string longitude;
        string latitude;
    }

    mapping(uint256 => PropertyStruct) public properties;

    //  Events
    event TenantAdded(uint256 propertyCount, address tenant);
    event PropertyAdded(PropertyStruct property);
    event TenantRemoved(uint256 propertyCount);

    //  Functions
    function addProperty(
        string memory _userId,
        string memory _name,
        string memory _description,
        string memory _propertyAddress,
        int256 _price,
        string memory _propertyOwnershipHash,
        string memory _longitude,
        string memory _latitude
    ) public {
        PropertyStruct memory property = PropertyStruct(
            propertyCount,
            msg.sender,
            _userId,
            _name,
            _description,
            _propertyAddress,
            _price,
            _propertyOwnershipHash,
            true,
            block.timestamp,
            address(0),
            0,
            _longitude,
            _latitude
        );
        properties[propertyCount] = property;
        propertyCount++;

        emit PropertyAdded(property);
    }

    function addTenant(
        uint256 _propertyCount,
        address _tenant,
        uint256 _paymentDate
    ) public {
        PropertyStruct memory _property = properties[_propertyCount];
        _property.available = false;
        _property.tenant = _tenant;
        _property.paymentDate = _paymentDate;
        properties[_propertyCount] = _property;

        emit TenantAdded(_propertyCount, _tenant);
    }

    function removeTenant(uint256 _propertyCount) public {
        PropertyStruct memory _property = properties[_propertyCount];
        _property.available = true;
        _property.tenant = address(0);
        _property.paymentDate = 0;
        properties[_propertyCount] = _property;

        emit TenantRemoved(_propertyCount);
    }

    function updatePaymentDate(uint256 _propertyCount, uint256 _paymentDate)
        public
    {
        PropertyStruct memory _property = properties[_propertyCount];
        _property.paymentDate = _paymentDate;
        properties[_propertyCount] = _property;
    }
}
