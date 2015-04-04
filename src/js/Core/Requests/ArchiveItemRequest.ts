// ---------------------------------------------------------------------------
// <copyright file="ArchiveItemRequest.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// ---------------------------------------------------------------------------

//-----------------------------------------------------------------------
// <summary>Defines the ArchiveItemRequest class.</summary>
//-----------------------------------------------------------------------

namespace Microsoft.Exchange.WebServices.Data
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    /// <summary>
    /// Represents a ArchiveItem request.
    /// </summary>
    internal class ArchiveItemRequest : MultiResponseServiceRequest<ArchiveItemResponse>, IJsonSerializable
    {
        /// <summary>
        /// Source folder id
        /// </summary>
        private FolderId sourceFolderId;

        /// <summary>
        /// Items
        /// </summary>
        private ItemIdWrapperList ids = new ItemIdWrapperList();

        /// <summary>
        /// Initializes a new instance of the <see cref="ArchiveItemRequest"/> class.
        /// </summary>
        /// <param name="service">The service.</param>
        /// <param name="errorHandlingMode"> Indicates how errors should be handled.</param>
        internal ArchiveItemRequest(ExchangeService service, ServiceErrorHandling errorHandlingMode)
            : base(service, errorHandlingMode)
        {
        }

        /// <summary>
        /// Validates request.
        /// </summary>
        internal override void Validate()
        {
            EwsUtilities.ValidateParam(this.sourceFolderId, "SourceFolderId");
            this.sourceFolderId.Validate(this.Service.RequestedServerVersion);
        }

        /// <summary>
        /// Creates the service response.
        /// </summary>
        /// <param name="service">The service.</param>
        /// <param name="responseIndex">Index of the response.</param>
        /// <returns>Service response.</returns>
        internal override ArchiveItemResponse CreateServiceResponse(ExchangeService service, int responseIndex)
        {
            return new ArchiveItemResponse();
        }

        /// <summary>
        /// Gets or sets the Archive source folder id.
        /// </summary>
        /// <value>The archive source folder id.</value>
        public FolderId SourceFolderId
        {
            get { return this.sourceFolderId; }
            set { this.sourceFolderId = value; }
        }

        /// <summary>
        /// Gets the item ids.
        /// </summary>
        /// <value>The item ids.</value>
        internal ItemIdWrapperList Ids
        {
            get { return this.ids; }
        }

        /// <summary>
        /// Gets the expected response message count.
        /// </summary>
        /// <returns>Number of expected response messages.</returns>
        internal override int GetExpectedResponseMessageCount()
        {
            return this.ids.Count;
        }

        /// <summary>
        /// Gets the name of the XML element.
        /// </summary>
        /// <returns>XML element name,</returns>
        internal override string GetXmlElementName()
        {
            return XmlElementNames.ArchiveItem;
        }

        /// <summary>
        /// Gets the name of the response XML element.
        /// </summary>
        /// <returns>XML element name,</returns>
        internal override string GetResponseXmlElementName()
        {
            return XmlElementNames.ArchiveItemResponse;
        }

        /// <summary>
        /// Gets the name of the response message XML element.
        /// </summary>
        /// <returns>XML element name,</returns>
        internal override string GetResponseMessageXmlElementName()
        {
            return XmlElementNames.ArchiveItemResponseMessage;
        }

        /// <summary>
        /// Gets the request version.
        /// </summary>
        /// <returns>Earliest Exchange version in which this request is supported.</returns>
        internal override ExchangeVersion GetMinimumRequiredServerVersion()
        {
            return ExchangeVersion.Exchange2013;
        }

        /// <summary>
        /// Writes XML elements.
        /// </summary>
        /// <param name="writer">The writer.</param>
        internal override void WriteElementsToXml(EwsServiceXmlWriter writer)
        {
            writer.WriteStartElement(XmlNamespace.Messages, XmlElementNames.ArchiveSourceFolderId);
            this.SourceFolderId.WriteToXml(writer);
            writer.WriteEndElement();

            this.WriteIdsToXml(writer);
        }

        /// <summary>
        /// Writes the ids as XML.
        /// </summary>
        /// <param name="writer">The writer.</param>
        internal void WriteIdsToXml(EwsServiceXmlWriter writer)
        {
            this.Ids.WriteToXml(
                writer,
                XmlNamespace.Messages,
                XmlElementNames.ItemIds);
        }

        /// <summary>
        /// Creates a JSON representation of this object.
        /// </summary>
        /// <param name="service">The service.</param>
        /// <returns>
        /// A Json value (either a JsonObject, an array of Json values, or a Json primitive)
        /// </returns>
        object IJsonSerializable.ToJson(ExchangeService service)
        {
            JsonObject jsonObject = new JsonObject();
            
            jsonObject.Add(XmlElementNames.ArchiveSourceFolderId, this.SourceFolderId.InternalToJson(service));

            this.AddIdsToJson(jsonObject, service);

            return jsonObject;
        }

        /// <summary>
        /// Adds the ids to json.
        /// </summary>
        /// <param name="jsonObject">The json object.</param>
        /// <param name="service">The service.</param>
        internal void AddIdsToJson(JsonObject jsonObject, ExchangeService service)
        {
            jsonObject.Add(XmlElementNames.ItemIds, this.Ids.InternalToJson(service));
        }
    }
}