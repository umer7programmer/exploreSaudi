import React from "react";
import Layout from "../../components/Layout/Layout/Layout";

const SafetyTravelTips = () => {
  return (
    <Layout>
      <div className="my-5 container pb-5 ">
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">Stay Connected!</div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            While English is widely spoken in Saudi Arabia, knowing a few Arabic
            expressions can enhance your experience and help you connect with
            locals. Arabic is the fifth most widely spoken language in the
            world! Here are some essential phrases to help you make new friends
            in Saudi Arabia, whether you’re exploring the souks, dining at a
            local restaurant, or sightseeing.
          </div>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Interesting Facts About Arabic
          </div>
          <ul className="">
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Arabic has a non-Latin alphabet consisting of 28 script letters,
              only three of which are vowels.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Arabic words and sentences are written and read from right to
              left, and books and papers are read from back to front.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Modern Standard Arabic (MSA) is the written form of Arabic used in
              academia, print, mass media, and the law. It is different from
              Classical Arabic, which is used in the Quran and early Islamic
              literature.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Punctuation marks in Arabic are used differently compared to many
              Western languages. For example, the Arabic comma faces the
              opposite direction of English (،) and may be found above the
              sentence instead of below.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Arabic shares some vocabulary with English, making it easier for
              English speakers to learn. Words like coffee, sugar, oranges, and
              limes are borrowed from Arabic.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Countries in the GCC region tend to speak the “khaleeji” dialect
              of Arabic. Although each country may have its own local terms,
              speakers can generally understand each other perfectly.
            </li>
          </ul>
        </div>
        <div className="  d-flex justify-content-center my-5 py-5">
          <img
            className="w-75 "
            style={{ height: "600px" }}
            src="/images/traveltip.jpg"
            alt="Common Arabic Expressions"
          />
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Useful Arabic Phrases
          </div>
          <ul>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Hello = Marhaba
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Thank you = Shukran
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Yes = Na'am
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              No = La
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Excuse me = Afwan
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Where is the restroom? = Ain al-Hammam?
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              I need help = Ana bahtaju musa'ada
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Goodbye = Ma'a as-salama
            </li>
          </ul>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Navigating the Souks
          </div>
          <ul>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              How much is this? = Kam hadha?
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Can you give me a discount? = Hal yumkinuka an tukhasira li
              khusus?
            </li>
          </ul>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">Dining Etiquette</div>
          <ul>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Please bring the bill = Min fadlik, jib al-hisab
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Is service charge included? = Hal tushtraku rasmu al-khidma?
            </li>
          </ul>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Enhancing Communication
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            Now that you’ve learned some Arabic phrases, try to incorporate them
            into your conversations during your travels in Saudi Arabia. By
            making an effort to speak the local language, you’ll not only enrich
            your cultural experience but also foster better communication and
            connections with the people you meet.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SafetyTravelTips;
