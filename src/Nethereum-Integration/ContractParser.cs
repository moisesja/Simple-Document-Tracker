using System.IO;
using Newtonsoft.Json.Linq;

namespace Nethereum_Integration
{
    public class ContractParser
    {
        private readonly JObject _jObject;

        public ContractParser(string path)
        {
            _jObject = JObject.Parse(File.ReadAllText(path));
        }

        public string Abi => _jObject.GetValue("abi").ToString();
    }
}