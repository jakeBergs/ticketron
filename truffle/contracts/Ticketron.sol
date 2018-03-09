pragma solidity ^0.4.18;

contract Ticketron {
    struct Ticket {
        address owner;
        bool used;
    }

    mapping(bytes32 => Ticket) public tickets;

    string eventName;
    uint ticketPrice;
    uint16 maxTickets;
    uint16 ticketsSold;
    address owner;

    event TicketHash(bytes32 key);
    event ProcessingError(string err);

    function Ticketron(string name, uint price, uint16 capacity) public {
        eventName = name;
        ticketPrice = price;
        maxTickets = capacity;
        ticketsSold = 0;
        owner = msg.sender;
    }

    function buyTicket() payable public returns (bytes32 ticketKey) {
        if(msg.value == ticketPrice && ticketsSold < maxTickets) {
            //create ticket
            ticketKey = keccak256(msg.sender);
            tickets[ticketKey] = Ticket(msg.sender, false);
            // transfer funds
            owner.transfer(ticketPrice);
            ticketsSold++;
            TicketHash(ticketKey);
        }
    }

    function useTicket(bytes32 key) public {
        if(tickets[key].owner == msg.sender && !tickets[key].used) {
            tickets[key].used = true;
        } else {
            revert();
        }
    }

    function getPrice() public returns (uint) {
        return ticketPrice;
    }

    function getTicketsRemaining() public returns (uint16) {
        return maxTickets - ticketsSold;
    }
}
