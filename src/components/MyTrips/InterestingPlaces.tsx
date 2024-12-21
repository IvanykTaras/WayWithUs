import React, { useEffect, useState } from "react";
import { PLACES_API_KEY } from "../../assets/ApiKeys";
import { Card, Spinner, ListGroup, Collapse, Modal, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const fetchPlaceDetails = async (location: string): Promise<{ placeId: string; lat: number; lng: number }> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(location)}&inputtype=textquery&fields=geometry,place_id&key=${PLACES_API_KEY}`
  );
  const data = await response.json();
  const place = data.candidates[0];
  return {
    placeId: place.place_id,
    lat: place.geometry.location.lat,
    lng: place.geometry.location.lng,
  };
};

const fetchNearbyPlaces = async (
  lat: number,
  lng: number,
  type: string
): Promise<{ name: string; place_id: string; rating?: number; price_level?: number; photo_url?: string }[]> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=${type}&key=${PLACES_API_KEY}`
  );
  const data = await response.json();
  return data.results
    .map((place: { name: string; place_id: string; rating?: number; price_level?: number; photos?: { photo_reference: string }[] }) => ({
      name: place.name,
      place_id: place.place_id,
      rating: place.rating,
      price_level: place.price_level || 1,
      photo_url: place.photos?.[0]?.photo_reference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=75&maxheight=75&photoreference=${place.photos[0].photo_reference}&key=${PLACES_API_KEY}`
        : "https://via.placeholder.com/75",
    }))
    .slice(0, 5);
};

const fetchPlaceReviews = async (placeId: string): Promise<{ author_name: string; text: string; rating?: number }[]> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${PLACES_API_KEY}`
  );
  const data = await response.json();
  return data.result?.reviews || [];
};

const InterestingPlaces = ({ originLocation }: { originLocation: string }) => {
  const [places, setPlaces] = useState<{
    restaurants: { name: string; place_id: string; rating?: number; price_level?: number; photo_url?: string }[];
    parks: { name: string; place_id: string; rating?: number; price_level?: number; photo_url?: string }[];
    museums: { name: string; place_id: string; rating?: number; price_level?: number; photo_url?: string }[];
    shoppingMalls: { name: string; place_id: string; rating?: number; price_level?: number; photo_url?: string }[];
    touristAttractions: { name: string; place_id: string; rating?: number; price_level?: number; photo_url?: string }[];
  }>({
    restaurants: [],
    parks: [],
    museums: [],
    shoppingMalls: [],
    touristAttractions: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [openPlaces, setOpenPlaces] = useState<boolean>(false);
  const [openCategory, setOpenCategory] = useState<{ [key: string]: boolean }>({});
  const [selectedPlace, setSelectedPlace] = useState<{ name: string; reviews: { author_name: string; text: string; rating?: number }[] } | null>(null);

  useEffect(() => {
    const fetchAllPlaces = async () => {
      try {
        const { lat, lng } = await fetchPlaceDetails(originLocation);

        const categories: Record<string, string> = {
          restaurants: "restaurant",
          parks: "park",
          museums: "museum",
          shoppingMalls: "shopping_mall",
          touristAttractions: "tourist_attraction",
        };

        const results: typeof places = {
          restaurants: [],
          parks: [],
          museums: [],
          shoppingMalls: [],
          touristAttractions: [],
        };

        for (const [key, type] of Object.entries(categories)) {
          results[key as keyof typeof places] = await fetchNearbyPlaces(lat, lng, type);
        }

        setPlaces(results);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlaces();
  }, [originLocation]);

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} color={i <= Math.round(rating) ? "#ffc107" : "#e4e5e9"} size={16} className="me-1" />
      );
    }
    return <span>{stars}</span>;
  };

  const renderPriceLevel = (priceLevel?: number) => {
    return <span className="text-success">{"$".repeat(priceLevel || 1)}</span>;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Header
        as="h5"
        className="text-center text-primary"
        onClick={() => setOpenPlaces(!openPlaces)}
        style={{ cursor: "pointer" }}
      >
        <p>
          Recommended Places to visit in{" "}
          <span style={{ fontWeight: 'bold' }}>{originLocation.split(",")[0]}</span>{"   "}
          <span style={{ color: '#17a2b8', fontSize: '0.6em' }}>sponsored</span>
        </p>

      </Card.Header>
      <Collapse in={openPlaces}>
        <Card.Body>
          {Object.entries(places).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h6
                className="text-secondary"
                onClick={() => setOpenCategory((prev) => ({ ...prev, [category]: !prev[category] }))}
                style={{ cursor: "pointer" }}
              >
                {category[0].toUpperCase() + category.slice(1)}
              </h6>
              <Collapse in={openCategory[category]}>
                <div>
                  <ListGroup variant="flush">
                    {items.map((place, index) => (
                      <ListGroup.Item key={index} className="d-flex align-items-center">
                        <img
                          src={place.photo_url}
                          alt={place.name}
                          style={{ width: "75px", height: "75px", marginRight: "10px", borderRadius: "4px" }}
                        />
                        <div className="d-flex flex-column flex-grow-1">
                          <a
                            href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none text-dark"
                          >
                            {place.name}
                          </a>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 mt-1"
                            onClick={async () => {
                              const reviews = await fetchPlaceReviews(place.place_id);
                              setSelectedPlace({
                                name: place.name,
                                reviews,
                              });
                            }}
                          >
                            Show Reviews
                          </Button>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          {renderStars(place.rating)}
                          {renderPriceLevel(place.price_level)}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </Collapse>
            </div>
          ))}
        </Card.Body>
      </Collapse>

      <Modal show={!!selectedPlace} onHide={() => setSelectedPlace(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPlace?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlace?.reviews && selectedPlace.reviews.length > 0 ? (
            selectedPlace.reviews.map((review, index) => (
              <div key={index} className="mb-3">
                <strong>{review.author_name}</strong>
                {review.rating && renderStars(review.rating)}
                <p>{review.text}</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedPlace(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default InterestingPlaces;
