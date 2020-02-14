using System;
using System.Threading.Tasks;
using Nethereum.Web3;

namespace Nethereum_Integration
{
    class Program
    {
        static async Task GetAccountBalance()
        {
            var web3 = new Web3("https://rinkeby.infura.io/v3/025dd953be614e1daf927b33228ab54c");
            var balance = await web3.Eth.GetBalance.SendRequestAsync("0x58453fd305a4ad23EF0F6b596f140AdD705CCe80");
            Console.WriteLine($"Balance in Wei: {balance.Value}");

            var etherAmount = Web3.Convert.FromWei(balance.Value);
            Console.WriteLine($"Balance in Ether: {etherAmount}");
        }


        public static void Main(string[] args)
        {
            GetAccountBalance().Wait();
            Console.ReadLine();
        }

            


            // Setup wallet

            // Get account

            // Load contract

            // Invoke method

            // Output Inquiries


        }
    
}
