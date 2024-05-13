import React from "react";
import Layout from "../../components/Layout/Layout/Layout";

const CommonPhrase = () => {
  return (
    <Layout>
      <div className="my-5 container pb-5 ">
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Make a connection!
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            Although you’ll hear plenty of English in Saudi, there’s nothing
            like knowing a few Arabic expressions to help you really connect
            with the locals. More reason to learn some basic Arabic: It is the
            fifth most widely spoken language in the world! Below, we asked some
            native speakers for a few handy expressions you can use to make new
            friends in Saudi, whether you’re shopping, dining or just
            sightseeing. But first...
          </div>
        </div>
        <div className="my-5 ">
          <div className="h2 my-4 all-headings-textColor">
            A Few Fun Facts About Arabic
          </div>
          <ul className="">
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Arabic has a non-Latin alphabet of 28 script letters (only three
              of which are vowels).
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Arabic words and sentences are written and read from right to
              left, and books and papers from back to front.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Modern Standard Arabic (MSA) is written Arabic. It is generally
              not spoken, but it is used in academia, print, mass media (you
              will hear it on some news programs) and the law. Western linguists
              consider MSA to be different from Classical Arabic, which is used
              in the Quran and early Islamic literature.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Punctuation marks are used differently in Arabic than they are in
              many Western languages: The Arabic comma, for example, faces the
              opposite direction of English (،) and may be found above the
              sentence it is used in instead of below. Ditto the question mark (
              ؟ versus ?).
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Arabic vocabulary may not be as difficult for English speakers as
              you’d think, as the two languages share some words: Coffee, sugar,
              oranges and limes are all terms borrowed from Arabic.
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Countries in the GCC tend to speak the “khaleeji” dialect of
              Arabic, with some fun local terms thrown in here and there, but
              they can all understand each other perfectly.
            </li>
          </ul>
        </div>
        <div className="  d-flex justify-content-center my-5 py-5">
          <img
            className="w-75 "
            style={{ height: "600px" }}
            src="https://www.visitsaudi.com/content/dam/no-dynamic-media-folder/manifest-common-expressions/common_expressions_card_1.jpg"
            alt="img not found"
          />
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            Common Arabic Phrases
          </div>
          <ul>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              It’s nice to meet you = Forsa sa’eda or Tasharrafna
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Do you speak English? = Tetkalam Engleezy?
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              I don’t understand much Arabic = Ma afham Arabi
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              What is your name? = Eysh Esmk?
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              My name is “X” = Ismii “X”
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              How are you? = Kaif halak? Kaif al hal? or Kafik?
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              I’m fine, thank you = Ana bikhayr shukran
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              I hope to return = Atamana arjaa
            </li>
          </ul>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            What to Say at the Souq
          </div>
          <ul>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              Can you help me, please? = Momkn mosa’ada?
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              How much? = Kam? or Be kam?
            </li>
          </ul>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            What to Say at a Restaurant
          </div>
          <ul>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              The meal was delicious! = Alakil latheeth!
            </li>
            <li
              className="text-color-search text-decoration-none py-2"
              style={{ fontSize: 16 }}
            >
              May I have the check, please? = Momken alfatorah law samaht?
            </li>
          </ul>
        </div>
        <div className="my-5">
          <div className="h2 my-4 all-headings-textColor">
            How to Foster Communication in Saudi
          </div>
          <div className="text-color-search" style={{ fontSize: "16px" }}>
            Now that you’ve learned the basics of the language, it’s time to act
            like a local! Check out this Q&A about Saudi customs.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommonPhrase;
