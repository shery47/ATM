#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from 'figlet';

console.log(figlet.textSync("My ATM"));

const answer = await inquirer
    
    .prompt([
    {
        type : "input",
        name : "userId",
        message : "Kindly Enter User ID"
    },
    {
        type : "password",
        name : "userPin",
        mask: '*',
        message : "Kindly Enter User Pin"
    },
    {
        type : "list",
        name : "accountType",
        choices: ["Current Acc." , "Saving Acc."],
        message : "Select your Account Type"
    },
    {
        type : "list",
        name : "transactionType",
        choices: ["Fast Cash" , "Withdraw"],
        message : "Select your Transaction",
        when(answer){
            return answer.accountType;
        }
    },
    {
        type : "list",
        name : "amount",
        choices: ["1000", "2000", "3000", "5000", "10000", "20000"],
        message : "Select your Amount",
        when(answer){
            return answer.transactionType == "Fast Cash";
        }
    },
    {
        type : "number",
        name : "amount",
        message : "Enter your Amount",
        when(answer){
            return answer.transactionType == "Withdraw";
        }
    },
])

if(answer.userId && answer.userPin){
    const balance = 50000;
    console.log(chalk.italic.blueBright("Previous Balanace", balance));

    const enteredAmount = answer.amount;
    if (balance >= enteredAmount){
        const remaining = balance - enteredAmount;
        console.log (chalk.bold.cyan("Your remaing balance is: ", remaining));
    }
    else {
        console.log (chalk.italic.grey("You have Insufficient Balance"));
    }
}
