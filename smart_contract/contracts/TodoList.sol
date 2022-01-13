// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract TodoList {
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    constructor() public {
        createTask("First Task");
    }

    mapping(uint256 => Task) public tasks;

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }
}
