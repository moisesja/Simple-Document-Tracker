using System;
using System.Threading.Tasks;
using Nethereum.Web3;

namespace Nethereum_Integration
{
    class Program
    {
        static async Task ViewInquiriesAsync(string contractAddress)
        {
            // Get ABI
            var parser = new ContractParser("contracts/DocumentTracker.json");
            var abi = parser.Abi;

            var web3 = new Web3("https://rinkeby.infura.io/v3/025dd953be614e1daf927b33228ab54c");
            var contract = web3.Eth.GetContract(abi, contractAddress);

            // First get the number of inquiries
            var getInquiriesCountFunc = contract.GetFunction("getInquiriesCount");

            var inquiriesCount = await getInquiriesCountFunc.CallAsync<int>();

            var inquiryEntriesFunc = contract.GetFunction("InquiryEntries");

            Console.WriteLine($"Number of Inquiries: {inquiriesCount}");

            for (var index = 0; index < inquiriesCount; index++)
            {
                var inquiry = await inquiryEntriesFunc
                    .CallDeserializingToObjectAsync<InquiryEntry>(index);

                Console.WriteLine($"Inquiry Date: {inquiry.InquiryDate} Inquirer Address: {inquiry.InquiryAddress}");
            }
        }

        public static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                throw new ArgumentException("Provide Contract Address");
            }

            var contractAddress = args[0];
            ViewInquiriesAsync(contractAddress).Wait();
        }
    }
    
}
