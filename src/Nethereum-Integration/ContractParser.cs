using System.IO;
using Newtonsoft.Json.Linq;

namespace Nethereum_Integration
{
    public class ContractMeta
    {
        private readonly JObject _jObject;

        public ContractMeta(string path)
        {
            _jObject = JObject.Parse(File.ReadAllText(path));
        }

        public string Abi => _jObject.GetValue("abi").ToString();
    }
}