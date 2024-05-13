import React from "react";
import Layout from "../../components/Layout/Layout/Layout";

const TravelRegulations = () => {
  return (
    <Layout>
      <div className="my-5 container pb-5 ">
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Travel Regulations in Saudi Arabia
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            When traveling to Saudi Arabia, it's important to familiarize
            yourself with the country's regulations to ensure a smooth and
            enjoyable trip. Here are some essential travel regulations and
            guidelines you need to know before visiting Saudi Arabia.
          </div>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            COVID-19 Guidelines
          </div>
          <ul className="">
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              All travelers to Saudi Arabia must provide proof of a negative
              COVID-19 PCR test taken within 72 hours before departure.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Upon arrival, travelers may be required to undergo a health
              screening and quarantine based on their health status and recent
              travel history.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Face masks are mandatory in all public spaces, and social
              distancing measures must be observed at all times.
            </li>
          </ul>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Visa Requirements
          </div>
          <ul className="">
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Most travelers require a visa to enter Saudi Arabia. It's
              essential to check the visa requirements based on your nationality
              before planning your trip.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Tourist visas are available for individuals wishing to explore the
              country's attractions. These visas can be obtained through the
              Saudi eVisa portal or through authorized travel agencies.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Business travelers and those visiting for religious purposes may
              require specific types of visas, so it's advisable to consult with
              the nearest Saudi embassy or consulate for accurate information.
            </li>
          </ul>
        </div>
        <div className="  d-flex justify-content-center my-5 py-5">
          <img
            className="w-75 "
            style={{ height: "600px" }}
            src="/images/travel.jpg"
            alt="Travel Regulations in Saudi Arabia"
          />
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Customs and Etiquette
          </div>
          <ul>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Saudi Arabia is a conservative Islamic country, and visitors are
              expected to respect local customs and traditions.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Dress modestly, particularly in public areas and religious sites.
              Women are required to wear an abaya (loose-fitting garment) and
              cover their heads with a scarf.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Public displays of affection are not tolerated, and alcohol
              consumption is strictly prohibited in Saudi Arabia.
            </li>
          </ul>
        </div>
        <div className="  d-flex justify-content-center my-5 py-5">
          <img
            className="w-75 "
            style={{ height: "600px" }}
            src="/images/traveltip2.jpg"
            alt="Travel Regulations in Saudi Arabia"
          />
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Health and Safety
          </div>
          <ul>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              It's advisable to drink bottled or boiled water to avoid
              waterborne diseases. Tap water may not be safe for consumption in
              all areas.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Seek medical advice before traveling to Saudi Arabia, and ensure
              you have adequate travel insurance to cover any medical
              emergencies.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 18 }}
            >
              Follow local traffic rules and exercise caution when crossing the
              street, as traffic can be chaotic in some cities.
            </li>
          </ul>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Cultural Considerations
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            Saudi Arabia is rich in culture and heritage, and visitors are
            encouraged to explore the country's historical sites and museums.
            However, it's essential to be respectful of local customs and
            sensitivities.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TravelRegulations;
