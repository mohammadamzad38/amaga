import React from "react";

const Faq = () => {
  return (
    <section className="max-w-6xl mx-auto px-5 lg:px-10 py-14 text-gray-700">
      {/* Section */}
      <div className="space-y-5">
        <h2 className="text-2xl text-center pb-4 font-bold text-[#073347]">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        {/* FAQ 1 */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
          <h3 className="text-xl font-bold text-[#073347]">
            Q-1. What is ITagama™?
          </h3>

          <p>
            ITagama.com is a business marketplace for the textile and apparel
            sectors. It carries out media & research activities, provides
            first-hand information on many elements of the textile, apparel, and
            fashion industries globally, and enables sourcing and marketing
            requirements.
          </p>
        </div>

        {/* FAQ 2 */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-5">
          <h3 className="text-xl font-bold text-[#073347]">
            Q-2. What will I get on ITagama.com?
          </h3>

          <p>ITagama™ offers varied business services, which include-</p>

          <ul className="space-y-4 list-disc pl-6">
            <li>
              <strong>B2B marketplace:</strong> Offering effective business
              solutions to small, medium, and large companies in the textile
              industry.
            </li>

            <li>
              <strong>Knowledge Services:</strong> ITagama™ allows you to
              publish market intelligence reports, articles, blogs, and the
              latest news.
            </li>

            <li>
              <strong>Recruitment Solutions:</strong> Creates the ideal job
              match by bringing together leading textile entrepreneurs and job
              seekers on one platform.
            </li>

            <li>
              textile entrepreneurs and job seekers on one platform.
              <strong> Trade Fair & Events:</strong> ITagama™ ITagamaTM gives
              you information about significant textile events, trade fairs, and
              conferences happening across the world.
            </li>

            <li>
              <strong>Audience:</strong> You may grow your audience by
              connecting with those working in the textile sector through
              ITagama™.
            </li>

            <li>
              <strong>E-Contract:</strong> You can set up an electronic contract
              (E-Contract) between the parties (buyers and suppliers) using
              ITagamaTM.
            </li>

            <li>
              <strong>Communication:</strong> With its dynamic messaging system,
              you can communicate with the users.
            </li>
          </ul>
        </div>

        {/* FAQ 3 */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
          <h3 className="text-xl font-bold text-[#073347]">
            Q-3. How can I Register on ITagama™?
          </h3>

          <p>
            Please click on the button to complete your registration process-
          </p>

          <a
            href="https://www.itagama.com/auth/register"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1DBF54] text-white px-48 py-2 rounded-sm font-medium break-all"
          >
            Register
          </a>
        </div>

        {/* FAQ 4 */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
          <h3 className="text-xl font-bold text-[#073347]">
            Q-4. Is ITagama™ free for the user?
          </h3>

          <p>
            ITagama™ is completely free for users. To utilize our website, you
            are not required to pay any joining fees or other payments.
          </p>
        </div>

        {/* FAQ 5 */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
          <h3 className="text-xl font-bold text-[#073347]">
            Q-5. How can I contact ITagama™?
          </h3>

          <p>
            You can contact us via email at{" "}
            <a
              href="mailto:marketing@itagama.com"
              className="text-[#1DBF74] font-medium hover:underline"
            >
              marketing@itagama.com
            </a>{" "}
            if you have any questions concerning the service we offer.
          </p>
        </div>

        {/* FAQ 6 */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
          <h3 className="text-xl font-bold text-[#073347]">
            Q-6. How can I delete my profile on ITagama™?
          </h3>

          <p>
            You can contact us at{" "}
            <a
              href="mailto:marketing@itagama.com"
              className="text-[#1DBF74] font-medium hover:underline"
            >
              marketing@itagama.com
            </a>{" "}
            and let us know why you want your ITagama™ profile deleted.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faq;
