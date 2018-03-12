pragma solidity ^0.4.18;

contract Ticketron {
    struct Ticket {
        address owner;
        bool used;
    }

    mapping(bytes32 => Ticket) tickets;

    string eventName;
    uint ticketPrice;
    uint16 maxTickets;
    uint16 ticketsSold;
    address venueOwner;

    event TicketHash(bytes32 key);
    event ProcessingError(string err);

    function Ticketron(string name, uint price, uint16 capacity) public {
        eventName = name;
        ticketPrice = price;
        maxTickets = capacity;
        ticketsSold = 0;
        venueOwner = msg.sender;
    }

    function buyTicket() payable public returns (bytes32 ticketKey) {
        if (msg.value == ticketPrice && ticketsSold < maxTickets) {
            //create ticket
            ticketKey = keccak256(msg.sender);
            tickets[ticketKey] = Ticket(msg.sender, false);
            // transfer funds
            venueOwner.transfer(ticketPrice);
            ticketsSold++;
            TicketHash(ticketKey);
        }
    }

    function useTicket(bytes32 key) public returns (bool) {
        if (tickets[key].owner == msg.sender && !tickets[key].used) {
            tickets[key].used = true;
            return true;
        } else {
            return false;
        }
    }

    function getPrice() public view returns (uint) {
        return ticketPrice;
    }

    function getTicketsRemaining() public view returns (uint16) {
        return maxTickets - ticketsSold;
    }

    function getOwner() public view returns (address) {
      return venueOwner;
    }

    function getEventName() public view returns (string) {
        return eventName;
    }

    function getTicket(bytes32 key) public view returns (bool) {
      return tickets[key].used;
    }
}
