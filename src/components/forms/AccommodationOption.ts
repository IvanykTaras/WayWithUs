export interface AccommodationOption {
  value: string;
  label: string;
}

export const accommodationOptions: AccommodationOption[] = [      
      { value: "budget_hotel", label: "Budget hotel" },
      { value: "midrange_hotel", label: "Mid-range hotel" },
      { value: "luxury_hotel", label: "Luxury hotel" },
      { value: "resort", label: "Resort" },
      { value: "hostel", label: "Hostel" },
      { value: "coliving", label: "Co-living space" },
      { value: "capsule_hotel", label: "Capsule hotel" },
      { value: "apartment", label: "Apartment" },
      { value: "vacation_rental", label: "Vacation rental (e.g., Airbnb)" },
      { value: "villa", label: "Villa" },
      { value: "campsite", label: "Campsite" },
      { value: "glamping", label: "Glamping" },
      { value: "cabin", label: "Cabin or cottage" },
      { value: "treehouse", label: "Treehouse" },
      { value: "houseboat", label: "Houseboat" },
      { value: "monastery", label: "Monastery or religious lodging" },
      { value: "farmstay", label: "Farm stay" },
      { value: "hunting_lodge", label: "Hunting or fishing lodge" },
      { value: "motel", label: "Motel" },
      { value: "cruise_ship", label: "Cruise ship cabin" },
      { value: "caravan", label: "Caravan or RV" },
    ];
