import React from "react";
import Layout from "../../components/Layout/Layout/Layout";

const SaudiWheather = () => {
  return (
    <Layout>
      <div className="my-5 container pb-5 ">
        <div className="my-5">
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            With a wide range of terrains — from mountains to deserts to beaches
            — it’s not surprising that Saudi’s weather is also diverse. And
            while certain generalities apply, there are important differences
            between regions to consider when planning a visit to Arabia. Here
            are answers to some of the most frequently asked climate-related
            questions.
          </div>
        </div>
        <div className="my-5">
          <div className="h2 all-headings-textColor my-4 ">
            What’s the Best Time of Year to Visit Saudi?
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            With an array of climates, cultural events, and cuisines, there is
            no wrong time to visit Saudi. The question is, when is the best time
            for you to visit Saudi? Check out this overview highlighting
            fabulous things to see, hear, do, smell, and taste every month so
            you can decide when to travel depending on what interests you the
            most.
          </div>
        </div>
        <div className="my-5">
          <div className="h2 all-headings-textColor my-4">
            What is the Hottest City in Saudi?
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            Makkah, known for being the holiest city in Islam, is also the
            hottest city in Saudi. In summer, temperatures sometimes top 48
            degrees C.
          </div>
        </div>
        <div className="my-5">
          <div className="h2 all-headings-textColor my-4">
            When Does it Rain in Saudi?
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            Being a desert climate, rain is scarce and usually concentrated from
            November through April.
          </div>
        </div>

        <div className="  d-flex justify-content-center my-5 py-5">
          <img
            className="w-75 "
            style={{ height: "600px" }}
            src="https://scth.scene7.com/is/image/scth/STA_Q1R_B2-01_Best%20Time%20to%20Travel_card_1:crop-1160x650?defaultImage=STA_Q1R_B2-01_Best%20Time%20to%20Travel_card_1&wid=2000&hei=1120"
            alt="img not found"
          />
        </div>

        <div className="my-5">
          <div className="h2 all-headings-textColor my-4">
            Does it Snow in Saudi?
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            Yes; in fact, a big storm that traveled across Europe in early 2020
            led to snowfall in the desert near Tabuk, about 190 kilometers
            northwest of the Red Sea. But even absent such meteorological
            events, snow is not uncommon in Saudi during winter, particularly in
            the mountains of the northern regions.
          </div>
        </div>
        <div className="my-5">
          <div className="h2 all-headings-textColor my-4">
            What is the Weather Like in Riyadh?
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            Riyadh, the capital, is located in the center of the country, at 600
            meters above sea level. From December to February, the weather is
            mild. In summer, it almost never rains, and the temperatures are
            very high, around 44 degrees C — although the relative humidity is
            low. “I was there in December, and it was incredibly hot during the
            day, despite a gentle breeze. But we went to the desert at night,
            and it was really chilly. We put on light down jackets and drank
            copious amounts of tea to keep warm!” reports Hande Oynar, an
            American writer who worked in Riyadh.
          </div>
        </div>
        <div className="  d-flex justify-content-center my-5 py-5">
          <img
            className="w-75 "
            style={{ height: "600px" }}
            src="https://scth.scene7.com/is/image/scth/STA_Q1R_B2-01_Best%20Time%20to%20Travel_card_1:crop-1160x650?defaultImage=STA_Q1R_B2-01_Best%20Time%20to%20Travel_card_1&wid=2000&hei=1120"
            alt="img not found"
          />
        </div>
        <div className="my-5">
          <div className="h2 all-headings-textColor my-4">
            How Should I Prepare for My Trip?
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            Now that you know when it’s the best time to travel for you and what
            to pack, take a look at this quick hit list with other important
            information you’ll need to prepare for your trip to Saudi.
          </div>
          <ul className="text-color-search" style={{ fontSize: "16px" }}>
            <li style={{ fontSize: "16px" }}>
              Learn how to communicate with these common expressions in Arabic
            </li>
            <li>
              Apply for your eVisa, a necessary document you’ll need to visit
              Saudi
            </li>
            <li>
              Check out the latest travel guidelines regarding COVID-19 to
              ensure you’ve completed all safety protocols before your trip
            </li>
            <li>Familiarize yourself with Saudi’s laws and etiquette</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default SaudiWheather;
