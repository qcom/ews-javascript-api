// ---------------------------------------------------------------------------
// <copyright file="RecurrenceRange.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// ---------------------------------------------------------------------------

//-----------------------------------------------------------------------
// <summary>Defines the RecurrenceRange class.</summary>
//-----------------------------------------------------------------------

namespace Microsoft.Exchange.WebServices.Data
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    /// <summary>
    /// Represents recurrence range with start and end dates.
    /// </summary>
    internal abstract class RecurrenceRange : ComplexProperty
    {
        private DateTime startDate;
        private Recurrence recurrence;

        /// <summary>
        /// Initializes a new instance of the <see cref="RecurrenceRange"/> class.
        /// </summary>
        internal RecurrenceRange()
            : base()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="RecurrenceRange"/> class.
        /// </summary>
        /// <param name="startDate">The start date.</param>
        internal RecurrenceRange(DateTime startDate)
            : this()
        {
            this.startDate = startDate;
        }

        /// <summary>
        /// Changes handler.
        /// </summary>
        internal override void Changed()
        {
            if (this.Recurrence != null)
            {
                this.Recurrence.Changed();
            }
        }

        /// <summary>
        /// Setup the recurrence.
        /// </summary>
        /// <param name="recurrence">The recurrence.</param>
        internal virtual void SetupRecurrence(Recurrence recurrence)
        {
            recurrence.StartDate = this.StartDate;
        }

        /// <summary>
        /// Writes elements to XML.
        /// </summary>
        /// <param name="writer">The writer.</param>
        internal override void WriteElementsToXml(EwsServiceXmlWriter writer)
        {
            writer.WriteElementValue(
                XmlNamespace.Types,
                XmlElementNames.StartDate,
                EwsUtilities.DateTimeToXSDate(this.StartDate));
        }

        /// <summary>
        /// Serializes the property to a Json value.
        /// </summary>
        /// <param name="service"></param>
        /// <returns>
        /// A Json value (either a JsonObject, an array of Json values, or a Json primitive)
        /// </returns>
        internal override object InternalToJson(ExchangeService service)
        {
            JsonObject jsonProperty = new JsonObject();

            this.AddPropertiesToJson(jsonProperty, service);

            return jsonProperty;
        }

        /// <summary>
        /// Adds the properties to json.
        /// </summary>
        /// <param name="jsonProperty">The json property.</param>
        /// <param name="service">The service.</param>
        internal virtual void AddPropertiesToJson(JsonObject jsonProperty, ExchangeService service)
        {
            jsonProperty.AddTypeParameter(this.XmlElementName);
            jsonProperty.Add(XmlElementNames.StartDate, EwsUtilities.DateTimeToXSDate(this.StartDate));
        }

        /// <summary>
        /// Tries to read element from XML.
        /// </summary>
        /// <param name="reader">The reader.</param>
        /// <returns>True if element was read.</returns>
        internal override bool TryReadElementFromXml(EwsServiceXmlReader reader)
        {
            switch (reader.LocalName)
            {
                case XmlElementNames.StartDate:

                    DateTime? startDate = reader.ReadElementValueAsUnspecifiedDate();
                    if (startDate.HasValue)
                    {
                        this.startDate = startDate.Value;
                        return true;
                    }

                    return false;

                default:
                    return false;
            }
        }

        /// <summary>
        /// Loads from json.
        /// </summary>
        /// <param name="jsonProperty">The json property.</param>
        /// <param name="service">The service.</param>
        internal override void LoadFromJson(JsonObject jsonProperty, ExchangeService service)
        {
            base.LoadFromJson(jsonProperty, service);

            foreach (string key in jsonProperty.Keys)
            {
                switch (key)
                {
                    case XmlElementNames.StartDate:

                        DateTime? startDate = service.ConvertStartDateToUnspecifiedDateTime(jsonProperty.ReadAsString(key));
                        if (startDate.HasValue)
                        {
                            this.startDate = startDate.Value;
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        /// <summary>
        /// Gets the name of the XML element.
        /// </summary>
        /// <value>The name of the XML element.</value>
        internal abstract string XmlElementName { get; }

        /// <summary>
        /// Gets or sets the recurrence.
        /// </summary>
        /// <value>The recurrence.</value>
        internal Recurrence Recurrence
        {
            get { return this.recurrence; }
            set { this.recurrence = value; }
        }

        /// <summary>
        /// Gets or sets the start date.
        /// </summary>
        /// <value>The start date.</value>
        internal DateTime StartDate
        {
            get { return this.startDate; }
            set { this.SetFieldValue<DateTime>(ref this.startDate, value); }
        }
    }
}
