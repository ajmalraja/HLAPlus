//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HlaplusWebApi.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class nomenclature
    {
        public int Id { get; set; }
        public string Version { get; set; }
        public System.DateTime PublishedDate { get; set; }
        public string Origin { get; set; }
        public string Repository { get; set; }
        public string Author { get; set; }
        public System.DateTimeOffset Created { get; set; }
        public int CreatedByUserAccountId { get; set; }
        public Nullable<System.DateTimeOffset> LastModified { get; set; }
        public Nullable<int> LastModifiedByUserAccountId { get; set; }
    
        public virtual UserAccount UserAccount { get; set; }
        public virtual UserAccount UserAccount1 { get; set; }
    }
}