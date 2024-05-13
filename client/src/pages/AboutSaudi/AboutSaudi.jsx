import React from "react";
import Layout from "../../components/Layout/Layout/Layout";

const AboutSaudi = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row mt-5">
          <div className="col">
            <h2 all-headings-textColor>Discover Saudi Arabia</h2>
            <p>
              Welcome to the enchanting land of Saudi Arabia, a country steeped
              in rich culture and breathtaking natural beauty. From ancient
              historical sites to modern marvels, Saudi Arabia offers a diverse
              array of experiences for travelers.
            </p>
            <p>
              Explore the country's vibrant culture, indulge in traditional
              Arabian hospitality, and embark on unforgettable adventures across
              its diverse landscapes.
            </p>
          </div>
        </div>
        <div className="row mt-5 text-center py-3">
          <div className="col">
            <div className="d-flex justify-content-center align-items-center gap-5">
              <img
                src="/images/saudi1.jpg"
                alt="Culture and Heritage"
                className="img-fluid rounded-4 mt-5 "
                style={{ width: "400px", height: "600px" }}
              />
              <img
                src="/images/saudi2.jpg"
                alt="Natural Wonders"
                className="img-fluid rounded-4 mb-5"
                style={{ width: "400px", height: "600px" }}
              />
              <img
                src="/images/saudi3.jpg"
                alt="Modern Marvels"
                className="img-fluid rounded-4 mt-5"
                style={{ width: "400px", height: "600px" }}
              />
            </div>
          </div>
        </div>
        <div className="row mt-5 pt-3">
          <div className="col">
            <h2 all-headings-textColor>Explore Cultural Heritage</h2>
            <p>
              Immerse yourself in the rich history and cultural heritage of
              Saudi Arabia. Visit ancient archaeological sites such as Al-Ula
              and Madain Saleh, both UNESCO World Heritage Sites, and marvel at
              their impressive rock formations and historical artifacts.
            </p>
            <p>
              Experience traditional Arabic hospitality with a visit to a local
              family's home for a traditional "Gahwa" coffee ceremony. Engage
              with locals, learn about their customs, and savor the flavors of
              authentic Saudi cuisine.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h2 all-headings-textColor>Discover Natural Wonders</h2>
            <p>
              Saudi Arabia is blessed with breathtaking natural landscapes, from
              the stunning Red Sea coastline to the vast deserts of the Empty
              Quarter. Explore the crystal-clear waters of the Red Sea and
              discover vibrant coral reefs teeming with marine life.
            </p>
            <p>
              Venture into the heart of the desert on an exhilarating safari and
              witness the mesmerizing beauty of towering sand dunes and rugged
              mountains. Explore hidden oases, ancient caravan routes, and
              encounter the nomadic Bedouin tribes that call the desert home.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h2 all-headings-textColor>Experience Modern Marvels</h2>
            <p>
              Saudi Arabia's modern cities are architectural marvels that blend
              innovation with tradition. Explore the towering skyscrapers of
              Riyadh and the futuristic developments of Jeddah, and witness the
              country's rapid technological advancement.
            </p>
            <p>
              Visit the iconic King Abdulaziz Center for World Culture, known as
              Ithra, in Dhahran, and immerse yourself in interactive exhibits,
              cultural events, and educational programs that showcase the best
              of Saudi Arabia's arts and heritage.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h2 all-headings-textColor>Plan Your Adventure</h2>
            <ul
              style={{ fontSize: "16px" }}
              className="d-flex flex-column gap-3"
            >
              <li>Discover ancient rock art in the Hail region</li>
              <li>Explore the historical Diriyah district in Riyadh</li>
              <li>Experience the vibrant culture of Riyadh and Jeddah</li>
              <li>Indulge in traditional Saudi cuisine and hospitality</li>
              <li>Visit the UNESCO World Heritage Site of Al-Ahsa Oasis</li>
              <li>Embark on a pilgrimage to the holy city of Mecca</li>
              <li>Explore the bustling markets of Medina</li>
              <li>Discover the natural beauty of Asir Mountains</li>
              <li>Experience the adrenaline rush of desert activities</li>
              <li>Relax and rejuvenate in luxury resorts along the Red Sea</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutSaudi;
