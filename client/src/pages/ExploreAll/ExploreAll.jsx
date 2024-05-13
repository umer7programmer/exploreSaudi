import React from "react";
import Layout from "../../components/Layout/Layout/Layout";

const ExploreAll = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row mt-5">
          <div className="col">
            <h2 className="all-headings-textColor">Culture and Heritage</h2>
            <p>
              Saudi Arabia is rich in culture and heritage, boasting a history
              that dates back thousands of years. From ancient archaeological
              sites to vibrant traditional festivals, the country offers a
              glimpse into its fascinating past.
            </p>
            <p>
              One of the most iconic symbols of Saudi culture is the traditional
              Arabic coffee ceremony, known as "Gahwa". This ceremonial
              hospitality represents the warm and welcoming nature of the Saudi
              people.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h2 className="all-headings-textColor">Natural Wonders</h2>
            <p>
              Saudi Arabia is home to breathtaking natural wonders that attract
              visitors from around the globe. From the towering sand dunes of
              the Empty Quarter to the crystal-clear waters of the Red Sea, the
              country's diverse landscapes offer endless opportunities for
              adventure and exploration.
            </p>
            <p>
              The ancient city of Al-Ula, nestled within a stunning desert
              canyon, is a UNESCO World Heritage Site known for its impressive
              rock formations and archaeological treasures, including the iconic
              Madain Saleh.
            </p>
          </div>
        </div>
        <div className="row mt-5 text-center">
          <div className="col ">
            <div className="d-flex flex-row gap-5">
              <img
                src="/images/exploreAll1.jpg"
                alt="Culture and Heritage"
                className="img-fluid rounded-4 mt-5"
                width={"400px"}
                height={"700px"}
              />
              <img
                src="/images/exploreAll3.jpg"
                alt="Natural Wonders"
                className="img-fluid  rounded-4 pb-5"
                width={"400px"}
                height={"700px"}
              />
              <img
                src="/images/exploreAll2.jpg"
                alt="Modern Marvels"
                className="img-fluid rounded-4 mt-5"
                width={"400px"}
                height={"700px"}
              />
            </div>
          </div>
        </div>
        <div className="row mt-5 pt-3">
          <div className="col">
            <h2 className="all-headings-textColor">Modern Marvels</h2>
            <p>
              Saudi Arabia is rapidly evolving, with modern cities that blend
              innovation and tradition. From the towering skyscrapers of Riyadh
              to the futuristic developments in Jeddah, the country is at the
              forefront of technological advancement in the region.
            </p>
            <p>
              The King Abdulaziz Center for World Culture, known as Ithra, is a
              prime example of Saudi Arabia's commitment to arts and education.
              This iconic landmark in Dhahran offers interactive exhibits,
              cultural events, and educational programs for visitors of all
              ages.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <h2 className="all-headings-textColor">Explore Saudi Arabia</h2>
            <ul
              style={{ fontSize: "17px" }}
              className="d-flex flex-column gap-2"
            >
              <li>Visit the ancient city of Al-Ula and Madain Saleh</li>
              <li>Explore the beautiful Red Sea coastline</li>
              <li>Experience the vibrant culture of Riyadh</li>
              <li>Discover the stunning architecture of Jeddah</li>
              <li>Embark on a desert safari in the Empty Quarter</li>
              <li>Visit the historical Diriyah district in Riyadh</li>
              <li>Experience traditional Arabic hospitality</li>
              <li>Explore the modern art scene in Jeddah</li>
              <li>Visit the King Abdulaziz Center for World Culture (Ithra)</li>
              <li>Discover the ancient rock art of the Hail region</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExploreAll;
