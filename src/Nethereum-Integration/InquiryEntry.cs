using System;
using System.Numerics;
using Nethereum.ABI.FunctionEncoding.Attributes;

namespace Nethereum_Integration
{
    [FunctionOutput]
    public class InquiryEntry : IFunctionOutputDTO
    {
        [Parameter("int256", "InquiryDate", 1)]
        public BigInteger RawInquiryDate { get; set; }

        public DateTime InquiryDate
        {
            get
            {
                var baseDate = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
                return baseDate.AddSeconds((long)RawInquiryDate).ToLocalTime();
            }
        }

        [Parameter("address", "InquiryAddress", 2)]
        public string InquiryAddress { get; set; }
    }
}